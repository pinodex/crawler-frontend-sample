FROM node:12.18-alpine3.11

RUN npm install -g serve

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 5000

CMD serve -s dist/
