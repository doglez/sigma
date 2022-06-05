#!/bin/bash
## Create docker-compose.yml
touch docker-compose.yml 

## ReactJS 
# Initialize ReactJS
npx create-react-app client
cd client

# Install Libreries
npm install axios bootstrap formik jwt-decode react-redux react-router-dom redux redux-thunk yup yup-password @redux-devtools/extension

# File cleaning
rm -rf public/logo192.png public/logo512.png src/App.css src/App.test.js src/index.css src/logo.svg src/reportWebVitals.js src/setupTests.js public/manifest.json public/robots.txt

# Add .env
touch .env
touch .env.example

# Create Dockerfile
touch Dockerfile

# Create .dockerignore 
cp .gitignore .dockerignore
echo ".gitignore" >> .dockerignore
echo "/src/assets/scss" >> .dockerignore

# Modify .gitignore
echo ".env" >> .gitignore
echo "/src/assets/css" >> .gitignore

cd ..

## NodeJS
# Initializae Node project
mkdir server
cp client/.gitignore server/
cp client/.dockerignore server/
cd server
npm ini -y

# Create Dockerfile
touch Dockerfile

# Create all forlders
mkdir src _data src/config src/controllers src/database src/middleware src/models src/public src/routes src/utilis
touch src/server.js

# Add .env
touch .env
touch .env.example

# Install modules
npm install bcryptjs colors cookie-parser cors dotenv express express-mongo-sanitize express-rate-limit helmet hpp jsonwebtoken mongoose morgan nodemailer slugify xss-clean

npm i -D nodemon

# Se corre con el siguiente script
# bash Bootstrap_MERN.sh
