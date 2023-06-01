This is a example Node API to demonstrate how include opensource tools to increase security on a DevSecOps Model.

## My Application URL
    - https://api-service-brunobotelhobr.cloud.okteto.net/

## Local Environment

### Run it Locally
```
npm install
node index.js
http://localhost:8080/
```
### Build an Image
```
docker image build -t my-sample-api:1.0 .
```

### Run Your Image
```
docker run -p 8080:8080 my-sample-api:1.0
````

## Deploy using GitHub Actions

    - We will store the image on docker hub.
    - We run the application usng a free tier account on Okteto (https://www.okteto.com/) You can create an acount an deploy some workload on the freetier, it will run for 24 hours.
        - More details on: https://www.okteto.com/pricing/

To use this pipeline, you will need a free acount on [DockerHub](https://hub.docker.com/) and on [Okteto](https://www.okteto.com/).

### Adjustments:
On your Repository, set the following secrets:
```
secrets.DOCKERHUB_LOGIN         # Your DockerHUB Login
secrets.DOCKERHUB_PASS          # Your DockerHUB Password
secrets.OKTETO_API_KEY          # Your Oketeto API Key
```
On the file .github/workflows/main.yaml

Set your repository name for image hosting (Mys are brunobotelhobr for exmaple)
```
tags: |
brunobotelhobr/api_conversao:latest
brunobotelhobr/api_conversao:${{ github.run_number }}
```

With this you should be able to Go.

## Challenges

    - Deploy the aplication with CI/CD

    - Scan it with [Horussec](https://horusec.io/site/) Locally
    - Include Horusec on GitHub Actions
    - Fix the vulenrabilities or create expections, so you deployment can move forward.

    - Scan it with [Trivy](https://trivy.dev/) Locally
    - Include Horusec on GitHub Actions
        - For Images
        - For IAC
        - For App imports
    - Fix the vulenrabilities or create expections, so you deployment can move forward.

    - Scan it with [OWASP ZAP](https://www.zaproxy.org/download/) Locally
    - Include Horusec on GitHub Actions
    - Fix the vulenrabilities or create expections, so you deployment can move forward.

* Hint, This repository has other branchs with the tools aready in place, you if need, check them.
