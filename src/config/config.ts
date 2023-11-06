import dotenv from "dotenv";
dotenv.config();

export default {
  db: {
    host: process.env.HOST_DB || "localhost",
    user: process.env.USER_DB || "user",
    password: process.env.PASSWORD_DB || "password",
    database: process.env.DATABASE_DB || "socialyDB"
  },
  server: {
    port: process.env.PORT || 3000
  },
  jwt: {
    jwt_token: process.env.JWT_SECRET || "secret",
    jwt_expiration: process.env.JWT_EXPIRATION || 3600,
    jwt_refresh_token: process.env.JWT_REFRESH_SECRET || "refresh_secret",
    jwt_refresh_expiration: process.env.JWT_EXPIRATION || 86400
  }
};
