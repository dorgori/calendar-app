FROM node:lts-alpine

# ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

# RUN npm install --production --silent && mv node_modules ../
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
# CMD ["npm", "start"]
# CMD ["node" , "./src/index.js"]

# RUN chown -R node /usr/src/app

# USER node


