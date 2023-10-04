import dotenv from "dotenv";
dotenv.config();

export default {
  db: {
    host: process.env.HOST_DB || "localhost",
    user: process.env.USER_DB || "user",
    password: process.env.PASSWORD_DB || "password",
    database: process.env.DATABASE_DB || "socialyDB"
  }
};
