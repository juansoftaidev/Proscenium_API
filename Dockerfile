FROM node:20.5.1-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx playwright install chrome
CMD ["npm", "run", "test:serial"]