
FROM node:20.14

RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm-dev \
    libpango1.0-0 \
    libasound2 \
    libxtst6 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxshmfence1 \
    fonts-liberation \
    libappindicator3-1 \
    libnss3-dev \
    libnspr4 \
    lsb-release \
    wget \
    xdg-utils \
    ca-certificates \
    --no-install-recommends

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# EXPOSE 3000
CMD ["npm","run", "start"]