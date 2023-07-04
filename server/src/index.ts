import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import credentials from "./middlewares/credentials";
import { setBearer } from "./middlewares/setBearer";

// Routes imports
import usersRoute from "./routes/api/usersRoute";
import postsRoute from "./routes/api/postsRoute";
import registerRoute from "./routes/api/registerRoute";
import loginRoute from "./routes/api/loginRoute";
import refreshRoute from "./routes/api/refreshRoute";
import logoutRoute from "./routes/api/logoutRoute";
import commentRoute from "./routes/api/commentRoute";
import rePostRoute from "./routes/api/rePostRoute";
import friendsRoute from "./routes/api/friendsRoute";

//connect to database
connectDB();

const app = express();

//build in middleware

// app.use(credentials);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

// set auth header from jwt cookie
app.use(setBearer);

//routes

app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentRoute);
app.use("/register", registerRoute);
app.use("/auth", loginRoute);
app.use("/api/refresh", refreshRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/repost", rePostRoute);
app.use("/api/friends", friendsRoute);

// starting to listen only id connected to database

mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
