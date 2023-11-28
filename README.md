# Socialy: Full-Stack Social Media Application

This repository houses Socialy, a dynamic and feature-rich social media application crafted with TypeScript, React, and NodeJS. Dive into the heart of modern web development with a comprehensive tech stack that powers seamless user interactions.

## Project Highlights

- **Rich User Experience:** Socialy provides a captivating user experience, allowing users to create, edit, delete, share, and comment on posts. The friend feature fosters social connections.

- **Cutting-Edge Technologies:** The client side leverages React and TypeScript, employing Redux Toolkit for efficient state management and data fetching. Built entirely from scratch, the UI prioritizes performance with optimistic updates through RtkQuery.

- **Stylish and Maintainable UI:** With SCSS and BEM methodology, the UI is not just functional but also aesthetically pleasing. No reliance on external component libraries ensures a unique and maintainable codebase.

- **Scalable Architecture:** Following Clean Architecture principles, the server side, built with NodeJS, Express, and TypeScript, ensures a robust and scalable foundation. Explore the architecture in-depth [here](https://github.com/QuickerMaths/nodejs-clean-architecture).

- **Data Handling Mastery:** Utilizing MySQL for data storage, the database schema is meticulously designed for optimal performance. Abstaining from ORM, all queries are handcrafted to grasp the intricacies of SQL.

- **Security and Authentication:** Security is paramount. Socialy implements bcrypt for password hashing and JWT that is being sent in HttpOnly cookies for secure authentication.

- **Logging with Winston:** Robust logging with Winston provides insights into the server-side operations.

## Project Structure

- `client`: Frontend built with React and TypeScript.
- `server`: Backend using NodeJS, Express, and TypeScript.

## Backend Technologies

- **Docker:** Containerization for seamless deployment using Docker.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **JWT (JSON Web Tokens):** A compact, URL-safe means of representing claims to be transferred between two parties.
- **bcrypt:** A library to help hash passwords securely.
- **MySQL:** A relational database management system for efficient data storage.
- **Winston:** A versatile logging library for Node.js.

## Frontend Technologies

- **Vite:** A next-generation front-end tooling system.
- **React:** A declarative, efficient, and flexible JavaScript library for building user interfaces.
- **Redux Toolkit:** State management for React applications.
- **axios:** Promise-based HTTP client for the browser and Node.js.
- **formik:** Form handling with ease.
- **yup:** A JavaScript schema builder for value parsing and validation.
- **react-router:** Declarative routing for React.js.

## Database Schema

Explore the [database schema](https://drawsql.app/teams/best-team-eveeeer/diagrams/socialyapi) to understand the intricate relationships within Socialy's data structure.

## Get Started

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

# TODO:
- [ ] input validation on backend
- [ ] image uploading
- [ ] image processing
- [ ] email verification
- [ ] update authentication flow 
