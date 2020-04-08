# Install 
### Docker 
```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Docker Compose
`apt install docker-compose`

### Python
```
apt install python3.6
apt install python3-pip
```

### NPM modules for Flask app and Web app
```
cd api
npm install 
```
```
cd web
npm install 
```

### Change your custom path
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

#### init-letsencrypt.sh
Change your email and domain name (Optional, it is needed when you want your domain can handle HTTPS requests)

### Write your code
There are 3 tasks that you need to do for your project:

1. Write prediction for you model in `model/predictor.py`
2. Write your API in `api/app.py` using Flask framework (you can use the template that was written for image)
3. Write your web app using ReactJS (you can use the demo template that I wrote in `web/`)

# How to run the service
You should have an AWS EC2 instance instead of building all the things in local machine, because it require a good network 
for building docker file
```
sudo -s
./init-letsencrypt.sh
docker-compose build 
docker-compose up
```

# Others
- You can use serverless for your Flask app using `api/serverless.yml` (tutorial will be update later)