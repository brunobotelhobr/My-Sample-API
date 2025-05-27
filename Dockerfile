FROM node:20.16.0-bookworm
WORKDIR /app
COPY package*.json ./
ARG DEBIAN_FRONTEND=noninteractive
RUN useradd -m myuser
USER myuser
RUN npm install --ignore-scripts
COPY src/ /app/src/
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]