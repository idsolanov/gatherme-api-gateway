FROM node:carbon-slim

# Create app directory
WORKDIR /gatherme-api-gateway

# Install app dependencies
COPY package.json /gatherme-api-gateway/
RUN npm install

# Bundle app source
COPY . /gatherme-api-gateway/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
