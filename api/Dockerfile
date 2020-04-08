# Start from the latest Long Term Support (LTS) Ubuntu version
# for nginx tiangolo/uwsgi-nginx:python3.7
FROM ubuntu:18.04

# ENV # for nginx
#ENV UWSGI_INI /repo/api/uwsgi.ini

# Install pipenv
RUN apt-get update
RUN apt-get install -y python3-pip
RUN apt-get install -y libssl-dev libffi-dev
RUN apt install -y nodejs npm

# Create the working directory
RUN set -ex && mkdir /repo
WORKDIR /repo

# supervisord
RUN apt -y install supervisor && \
  mkdir -p /var/log/supervisor && \
  mkdir -p /etc/supervisor/conf.d
COPY api/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy only the relevant directories to the working diretory
COPY model/ ./model
COPY api/ ./api

# Install Python dependencies
ADD api/requirements.txt /repo/requirements.txt
RUN set -ex && pip3 install -r api/requirements.txt
RUN apt update && apt install -y libsm6 libxext6
RUN apt install libxrender1

#
RUN export LC_ALL=C.UTF-8
RUN export LANG=C.UTF-8

RUN apt install -y curl
RUN export AWS_ACCESS_KEY_ID=$(curl http://169.254.169.254/latest/meta-data/iam/security-credentials/root | python3 -c "import sys, json; print(json.load(sys.stdin)['AccessKeyId'])")
RUN export AWS_SECRET_ACCESS_KEY=$(curl http://169.254.169.254/latest/meta-data/iam/security-credentials/root | python3 -c "import sys, json; print(json.load(sys.stdin)['SecretAccessKey'])")

# Run the web server
WORKDIR /repo/api
RUN npm install
# for nginx
#ENV LISTEN_PORT 8000

EXPOSE 8000
ENV PYTHONPATH /repo
#CMD python3 /repo/api/app.py
# auto run supervisor in base image
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
