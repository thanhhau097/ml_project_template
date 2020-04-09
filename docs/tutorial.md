Note: this tutorial is using for using in a AWS ec2 instance (recommended)

# Install 
```
sudo -s
apt update
```

### Docker 
```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Docker Compose
`apt install -y docker-compose`

### Clone the repo
```
apt install git
git clone https://github.com/thanhhau097/ml_project_template.git 
```

### Change your custom path
`cd ml_project_template`
#### api/app.py
Change your bucket in AWS S3 (it is optional, when you need to upload user data to s3 bucket)
```
async_data = {
    'data': {'image': image_utils.encode(image), 'result': result},
    'bucket': 'your-bucket',
    'object_name': 'file-path-in-bucket/{}.pkl'.format(file_name)
}
```

#### nginx/nginx.conf
Change your domain name (optional, it's useful when you need a domain name instead of public IP address)

Comment out the SSL config in this file if you don't have domain name. (4-6, 29-40)

#### init-letsencrypt.sh
Note: if you don't have a domain name, please comment the `certbot` service in docker-compose.yml file.

Change your email and domain name (Optional, it is needed when you want your domain can handle HTTPS requests)

### Write your code
There are 3 tasks that you need to do for your project:

1. Write prediction for you model in `model/predictor.py` and update your weights in model/weights folder
2. Write your API in `api/app.py` using Flask framework (you can use the template that was written for image)
3. Write your web app using ReactJS (you can use the demo template that I wrote in `web/`)

# How to run the service
You should have an AWS EC2 instance instead of building all the things in local machine, because it require a good network 
for building docker file
```
./init-letsencrypt.sh # (use when you have a domain name)
docker-compose build 
docker-compose up
```

# Others
- You can use serverless for your Flask app using `api/serverless.yml` (tutorial will be update later)