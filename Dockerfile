FROM node:lts-alpine

# ENV NODE_ENV=production

WORKDIR /calendar-fe

COPY package.json .

# RUN npm install --production --silent && mv node_modules ../
RUN npm install

RUN cd /EVENT-SYSTEM-FE

COPY . .

EXPOSE 3000

# CMD ["npm", "start"]
CMD ["node" , "./src/index.js"]

# RUN chown -R node /usr/src/app

# USER node


