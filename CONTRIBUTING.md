# Contributing Guidelines

Thanks for your interest in contributing to this Node.js API example project! The purpose of this project is to demonstrate the inclusion of open-source tools to augment security in a DevSecOps model.

## Getting Started

### Project URL
- [Live Application](https://api-service-brunobotelhobr.cloud.okteto.net/)

### Local Environment
To run this project locally, you will need Node.js and npm installed.

1. Clone this repository and navigate to the root directory.
2. Install dependencies with `npm install`.
3. Start the server with `node index.js`.
4. Visit [http://localhost:8080/](http://localhost:8080/)

### Docker Environment
You can also run the application within a Docker container.

1. Build the Docker image: `docker image build -t my-sample-api:1.0 .`
2. Run the Docker image: `docker run -p 8080:8080 my-sample-api:1.0`

## Contribution Process

We appreciate your efforts to contribute. Here are the steps to get started:

1. Fork the repository.
2. Create a branch in your fork for your update.
3. Make your changes, including updating any relevant documentation.
4. Test your changes locally/on your fork.
5. Submit a pull request with your changes against the main branch of this repository.

We would appreciate it if any substantial contribution has a corresponding issue, and your PR references that issue.

## Deploying with GitHub Actions

This project uses GitHub Actions for continuous integration. We store the Docker image on Docker Hub and deploy the application using a free-tier Okteto account.

Please create your free accounts on [Docker Hub](https://hub.docker.com/) and [Okteto](https://www.okteto.com/).

For deploying your changes using GitHub Actions, you will need to set the following secrets in your repository:

- `DOCKERHUB_LOGIN`: Your Docker Hub login
- `DOCKERHUB_PASS`: Your Docker Hub password
- `OKTETO_API_KEY`: Your Okteto API key

Also, adjust the repository name for image hosting in `.github/workflows/main.yaml` with your Docker Hub username.

## Challenge

Your mission, should you choose to accept it, involves augmenting this project with additional security scanning and fixing vulnerabilities. Check the `Challenge` section in the README for more details.

Thanks for contributing!
