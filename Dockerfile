FROM node:18.12.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN true
COPY tsconfig.build.json ./
RUN true
COPY tsconfig.json ./
RUN node --max-old-space-size=8192
RUN npm i --omit=dev
COPY . .
RUN npm run build
RUN true
RUN true
ENV APP_PORT 3000
EXPOSE 3000

CMD ["npm", "run", "start:prod"]