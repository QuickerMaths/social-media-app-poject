# Socialy

This repo contains a full-stack social media application built with TypeScript, React, and NodeJS.

## Project Overview

Socialy application allows its users to create, update, delete, share, and comment on posts as well as add other users as their friends.

The client side of the application is built with React and TypeScript. I've used Redux Toolkit to handle state management and data fetching.
It also allowed me to easily handle loading and error states as well as data caching to improve application performance and reduce resource usage.
The whole UI is built from scratch without using any external component libraries. To keep all styles readable and maintainable I've used SCSS and BEM methodology.

The server side of the application is built with NodeJS, Express and TypeScript. I chose MYSQL to handle data storing and querying. 
The whole application design is based on Clean Architecture principles and it's similar to my previous [project](https://github.com/QuickerMaths/nodejs-clean-architecture), 
you can find a deeper dive into the details in its README. 

## How to run this project on your machine

### Prerequisites
* [Docker](https://www.docker.com/get-started/#h_installation)
* [Node](https://nodejs.org/en/download/current)

```
# clone this repo 
git clone https://github.com/QuickerMaths/social-media-app-poject

## navigate to project dir
cd social-media-app-project
```

### Client

```
# navigate to the client dir
cd client

# install dependencies 
npm i

# rename .env.example file to .env

# start the local server 
npm run dev
```

### Server

```
# navigate to the server dir
cd server

# install dependencies 
npm i

# rename .env.example file to .env

# start the database
npm run start:db

# start the local server
npm run start:dev

# if you want u can also seed the database with dummy data by running
npm run seed:db
```
