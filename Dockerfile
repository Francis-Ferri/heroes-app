FROM node:14-slim as build-step

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

RUN npm run build


FROM node:14-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY --from=build-step /usr/src/app/build ./

RUN npm install -g serve

CMD [ "serve", "-s build" , "-l 8080"]
 