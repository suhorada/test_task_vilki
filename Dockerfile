FROM node:14
RUN mkdir /app
WORKDIR /app
COPY ./ /app
RUN npm install
EXPOSE 3000