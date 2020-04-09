# ml_project_template

## Life cycle of a Machine Learning Project

![](./readme/ml_life_cycle.png)

## Machine Learning Tools

![](./readme/ml_tools.png)

## Deployment Monitor

![](./readme/ml_deployment_monitor.png)

# Tutorial
[Read the tutorial for local machine development](./docs/local_tutorial.md)

[Read the tutorial for cloud (AWS EC2) instance](./docs/tutorial.md)


## Our choices
### Data
- Data Labeling: DataTurks
- Data Storage: s3, file system, SQL, (data lake)
- Data Versioning: s3 + json, DVC
- Data Workflow: Airflow (TODO)

### Development
- Software Engineering: python, jupyter, git
- Resource Management: docker, kubernetes
- Framework: pytorch
- Experiment Management: tensorboard
- Distributed Training: AWS/GCP
- Hyperparameter Optimization: (...)

### Deployment
- CI/Testing: Circle CI, Jenkins, linting
  - https://jenkins.io/doc/tutorials/build-a-multibranch-pipeline-project/
- Web: AWS Lambda Serverless / Docker, Pytorch Serving
- Interchange: ONNX
- Monitoring: could be monitored in AWS
- Hardware/Mobile: CoreML, MLKit


# Resource
- https://fullstackdeeplearning.com/
- https://github.com/alirezadir/Production-Level-Deep-Learning


### How to run web on local to develop?
```
cd web
npm install 
npm run build
npm run start
```

### Tools use in this template
1. Flask
2. Redis
3. ReactJS
4. Nginx
5. Certbot (optional, when you have a domain name)
6. Celery
7. Docker
8. Jenkins (optional)