
FROM node:20.16.0-bookworm
WORKDIR /app
COPY package*.json ./
ARG DEBIAN_FRONTEND=noninteractive
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]