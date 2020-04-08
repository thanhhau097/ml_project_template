"""Flask Webserver for OCR service"""

import datetime
import os
import random

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from api.celery_app import celery_app
from api.utils import image_utils
from api.utils.s3_utils import upload_data
from model.predictor import ModelPredictor

os.environ["CUDA_VISIBLE_DEVICES"] = ""  # Do not use GPU

# TODO: enable SSL https://kracekumar.com/post/54437887454/ssl-for-flask-local-development
app = Flask(__name__)  # pylint: disable=invalid-name
# app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, supports_credentials=True, automatic_options=True)


@app.before_first_request
def load_model_to_app():
    app.predictor = ModelPredictor()


@app.route('/')
def index():
    return "Welcome to OCR Service"


@celery_app.task(bind=True)
def upload_data_async(self, async_data):
    """Upload data to an S3 bucket

        :param data: data to upload
        :param bucket: Bucket to upload to
        :param object_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
    """
    with app.app_context():
        upload_data(data=async_data['data'], bucket=async_data['bucket'], object_name=async_data['object_name'])


# TODO: when receive a new request, save the image and model prediction into s3
# @cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    """Provide main prediction API route. Responds to both GET and POST requests."""
    image = _load_image()
    pred = app.predictor.predict(image)
    result = {'pred': str(pred)}
    # TODO: unique ID, we can
    file_name = datetime.datetime.now().timestamp()
    file_name = str(file_name).replace('.', '') + str(random.randint(100000, 999999))
    async_data = {
        'data': {'image': image_utils.encode(image), 'result': result},
        'bucket': 'your-bucket',
        'object_name': 'file-path-in-bucket/{}.pkl'.format(file_name)
    }

    upload_data_async.delay(async_data)
    return jsonify(result)


def _load_image():
    if request.method == 'POST':
        data = request.get_json()
        if data is None:
            return 'no json received'
        return image_utils.read_b64_image(data['image'], grayscale=False)
    if request.method == 'GET':
        image_url = request.args.get('image_url')
        if image_url is None:
            return 'no image_url defined in query string'
        print("INFO url {}".format(image_url))
        return image_utils.read_image(image_url, grayscale=False)
    raise ValueError('Unsupported HTTP method')


def main():
    """Run the app."""
    app.run(host='0.0.0.0', port=8000, debug=False)


if __name__ == '__main__':
    main()
