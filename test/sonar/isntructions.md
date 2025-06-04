Here's your instruction guide rewritten in clean and professional Markdown format in English:

---

# SonarQube Setup and SARIF Plugin Integration

## 1. Start Your SonarQube Instance

```bash
docker compose up
```

## 2. Access the Admin Interface

* Open your browser and go to: [http://localhost:9000](http://localhost:9000)
* Login with:

  ```
  Username: admin
  Password: admin
  ```
* **Important**: Change the default password after logging in.

## 3. Install the SARIF Extension in SonarQube

Inside the SonarQube container, run the following commands:

```bash
cd /opt/sonarqube/extensions/plugins
wget https://gitlab.com/deschiens/sonar-plugin-sarif/-/releases/1.0.0/downloads/sonar-sarif-1.0.0.jar
```

* Then **restart the container**.

## 4. Verify Plugin Installation

* Log into the SonarQube UI.
* Navigate to the **Administration** panel.
* You should see a **SARIF** menu item. If visible, the plugin was installed correctly.

## 5. Install the SonarQube Scanner

* Download and install the [SonarQube Scanner](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/).

## 6. Scan Your Code

Run the following command in your project directory:

```bash
sonar-scanner \
  -Dsonar.projectKey=My-Sample-API \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=************ \
  -Dsonar.sarif.output=report-sanar.sarif
```

> ⚠️ Replace the token and project key with your actual values as needed.