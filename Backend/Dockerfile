FROM node:22-alpine

#Set the working directory inside the container
WORKDIR /usr/src/app

#copy Packages.json and Packages-lock.json First
COPY package*.json ./

#install dependencies but exclude bcrypt initially
RUN npm install && npm rebuild bcrypt --build-from-source

#copy the rest of the application code
COPY . .

COPY public ./public


#expose the port the app will run
EXPOSE 5000

#Run the application when the container starts
CMD ["sh", "-c", "node seed.js && npm start"]
