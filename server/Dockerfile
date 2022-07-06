FROM node:16.15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN chmod +x start.sh

EXPOSE 5000
CMD [ "bash","start.sh" ]

# To build a image
# docker build . -t sigma-be