FROM node:lts-alpine

# ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

# RUN npm install --production --silent && mv node_modules ../
RUN npm install

RUN cd /app

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# RUN chown -R node /usr/src/app

# USER node


