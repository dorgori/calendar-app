# FROM node:7.7.2-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 4000

# CMD ["node", "app.js"]

FROM node:current-alpine

RUN mkdir -p /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 4000

WORKDIR /app

ENTRYPOINT [ "node","app.js" ]



# FROM node:7
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# CMD node server.js
# EXPOSE 4000