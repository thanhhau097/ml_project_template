import logging
import os
import sys
import threading

import boto3
from botocore.exceptions import ClientError
import pickle


class ProgressPercentage(object):
    def __init__(self, filename):
        self._filename = filename
        self._size = float(os.path.getsize(filename))
        self._seen_so_far = 0
        self._lock = threading.Lock()

    def __call__(self, bytes_amount):
        # To simplify, assume this is hooked up to a single filename
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            sys.stdout.write(
                "\r%s  %s / %s  (%.2f%%)" % (
                    self._filename, self._seen_so_far, self._size,
                    percentage))
            sys.stdout.flush()


def _save_temp_file(file_name, data):
    with open(file_name, 'wb') as f:
        pickle.dump(data, f)

    return True


def _delete_temp_file(path):
    os.remove(path)


def _upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name, Callback=ProgressPercentage(file_name))
    except ClientError as e:
        logging.error(e)
        return False
    return True


def upload_data(data, bucket, object_name=None):
    """Upload data to an S3 bucket

        :param data: data to upload
        :param bucket: Bucket to upload to
        :param object_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
    """

    print('Saving temp file...')
    file_name = object_name.split('/')[-1]
    _save_temp_file(file_name, data)
    try:
        print('Uploading...')
        _upload_file(file_name, bucket, object_name)
    except:
        print('WARNING: Could not upload file!!!')
    finally:
        print('Deleting file...')
        _delete_temp_file(file_name)
