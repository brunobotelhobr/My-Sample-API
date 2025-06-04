FROM node:20.16.0-bookworm
WORKDIR /app
COPY package*.json ./
COPY index.js ./
ARG DEBIAN_FRONTEND=noninteractive
RUN useradd -m myuser
RUN chown -R myuser:myuser /app
USER myuser
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]