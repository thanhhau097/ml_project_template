# ml_project_template

# Tutorial
This is tutorial for local development on local machine
# Install 
```
sudo -s
apt update
apt install -y npm
apt install -y python3.6 python3-pip
apt install -y nginx
apt update && apt install -y libsm6 libxext6
apt install libxrender1
apt install -y redis-server
```

### Clone the repo
```
apt install git
git clone https://github.com/thanhhau097/ml_project_template.git 
```

### Install requirements
```
cd ml_project_template
alias python=python3
alias pip=pip3
```

#### Requirements for Flask app
```
cd api
pip install -r requirements.txt
npm install
```
#### Requirements for web app
```
cd ../web
npm install
```

### Change your custom path
#### api/app.py
You need to config your AWS account in local machine: (optional, it is useful when you want to save uploaded data to AWS s3)
```
apt install awscli
aws configure
```

Change your bucket in AWS S3 (it is optional, when you need to upload user data to s3 bucket)
```
async_data = {
    'data': {'image': image_utils.encode(image), 'result': result},
    'bucket': 'your-bucket',
    'object_name': 'file-path-in-bucket/{}.pkl'.format(file_name)
}
```

#### nginx/nginx.conf
Comment out the SSL config in this file because you don't need domain name for local development (line 4-6, 29.41).
If you want to deploy into production, please see [this link](./tutorial.md).

### Write your code
There are 3 tasks that you need to do for your project:

1. Write prediction for you model in `model/predictor.py` and update your weights in model/weights folder
2. Write your API in `api/app.py` using Flask framework (you can use the template that was written for image)
3. Write your web app using ReactJS (you can use the demo template that I wrote in `web/`)

# How to run the service
Open multiple terminal windows, each process should be handle in one window.

1. Web
```
cd web/
npm run build
npm run start
```

2. Flask
```
export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export PYTHONPATH=$PYTHONPATH:./ 
python api/app.py 
```

3. Redis

Change redis conf in /etc/redis/redis.conf 
```
bind 0.0.0.0
```

```
systemctl stop redis
systemctl start redis
```

4. Celery

Change 'redis://redis:6379/0' to 'redis://localhost:6379/0' because you are running redis in local machine
```
celery worker -A api.app.celery_app --loglevel=info
```

5. Nginx

Change the app and web in nginx/nginx.conf file to 0.0.0.0
```
sudo -s
rm /etc/nginx/sites-enabled/default
cp nginx/nginx.conf /etc/nginx/sites-enabled/
systemctl reload nginx
```

Now you can go to your browser and see what is happening: [0.0.0.0:8080](0.0.0.0:8080)


### Tools use in this template
1. Flask
2. Redis
3. ReactJS
4. Nginx
5. Certbot (optional, when you have a domain name)
6. Celery
7. Docker
8. Jenkins (optional)