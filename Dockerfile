FROM node:14.17.1

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY /common ./common
COPY /client ./client
COPY /server ./server

ENV NODE_ENV production

RUN npm install -g npm
RUN npm install
RUN npm run build -w common
RUN npm run build -w client

RUN npm run prisma:generate -w server
RUN npm run build -w server

EXPOSE 3000 4000

CMD ["npm", "start"]
