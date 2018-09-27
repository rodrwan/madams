FROM node:10.11.0-slim as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
COPY .env ./
RUN yarn build

# Stage 2 - the production environment
FROM node:alpine
COPY --from=build-deps /usr/src/app/build /usr/src/app/www
RUN yarn global add serve
EXPOSE 80
CMD ["serve", "-l 80", "www"]
