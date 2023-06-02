This project showcases a Node.js API designed to demonstrate how to include open-source tools to increase security within a DevSecOps model.

## Live Application

You can interact with the live API [here](https://api-service-brunobotelhobr.cloud.okteto.net/).

## Local Environment

You can set up your local environment for development or testing.

### Running the Application Locally

First, install the required packages:
```sh
npm install
```

Then, start the server:

```sh
node index.js
```

Access the application at `http://localhost:8080/`.

### Docker Environment
To containerize the application, you can create a Docker image and run it.

Building an Image
```sh
docker image build -t my-sample-api:1.0 .
```

Running the Docker Image
```sh
docker run -p 8080:8080 my-sample-api:1.0
```

Access the application at `http://localhost:8080/`.

Publishing on Docker Hub
```sh
docker login
docker tag my-sample-api:1.0 myusername/my-sample-api:1.0
docker push myusername/my-sample-api:1.0
```

## Deployment Using GitHub Actions
The application is configured to be automatically built, tested, and deployed using GitHub Actions. The Docker image is stored on Docker Hub and deployed to a free-tier Okteto account.

You'll need free accounts on Docker Hub and Okteto to leverage the pipeline.

## Setup for GitHub Actions
Add the following secrets to your GitHub repository:

    `DOCKERHUB_LOGIN`: Your Docker Hub login
    `DOCKERHUB_PASS`: Your Docker Hub password
    `OKTETO_API_KEY`: Your Okteto API key

In the .github/workflows/main.yaml file, set your Docker Hub username in place of brunobotelhobr:

```sh
tags: |
    your_dockerhub_username/api_conversao:latest
    your_dockerhub_username/api_conversao:${{ github.run_number }}
```

## Challenge
The project comes with a set of challenges to test your DevSecOps skills:

Deploy the application using Github Actions CI/CD.

Run a local security scan using HorusSec, integrate it into GitHub Actions, and address or bypass any vulnerabilities found.

Similarly, scan the application with Trivy and OWASP ZAP and incorporate them into the CI/CD process.

Remember, there are branches in this repository where these tools are already integrated. Feel free to check them out if you need any guidance.

Happy hacking!

* Hint, This repository has other branchs with the tools aready in place, you if need, check them.
