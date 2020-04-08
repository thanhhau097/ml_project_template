# Start from the latest Long Term Support (LTS) Ubuntu version
FROM ubuntu:18.04

# Install pipenv
RUN apt-get update
RUN apt install -y nodejs npm
RUN apt-get install -y curl
#RUN apt-get install -y python3-pip

# Create the working directory
RUN set -ex && mkdir /repo
WORKDIR /repo

# Copy only the relevant directories to the working diretory
COPY web/ ./web

RUN export LC_ALL=C.UTF-8
RUN export LANG=C.UTF-8

# Run the web server
EXPOSE 8080
WORKDIR /repo/web
RUN npm install
RUN npm run build
CMD npm run start
