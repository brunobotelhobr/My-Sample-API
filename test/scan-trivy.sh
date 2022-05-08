# Dependencias system
trivy fs -f json -o scan-trivy-fs.json .
# ICA system
trivy conf -f json -o scan-trivy-conf.json .
# Image
trivy image -f json -o scan-trivy-image.json brunobotelhobr/api_conversao:latest

# SBOM CycloneDX Files
trivy fs . --format cyclonedx scan-trivy-sbom-fs.json
trivy image --format cyclonedx -o scan-trivy-sbom-image.json brunobotelhobr/api_conversao:latest