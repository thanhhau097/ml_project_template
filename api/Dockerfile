# Start from the latest Long Term Support (LTS) Ubuntu version
FROM ubuntu:18.04

# Install pipenv
RUN apt-get update
RUN apt-get install -y python3-pip

# Create the working directory
RUN set -ex && mkdir /repo
WORKDIR /repo

# Copy only the relevant directories to the working diretory
COPY text_recognizer/ ./text_recognizer
COPY api/ ./api

# Install Python dependencies
RUN set -ex && pip3 install -r api/requirements.txt
RUN apt update && apt install -y libsm6 libxext6
RUN apt install libxrender1

# Language
RUN export LC_ALL=C.UTF-8
RUN export LANG=C.UTF-8

# Run the web server
EXPOSE 8000
ENV PYTHONPATH /repo
CMD python3 /repo/api/app.py