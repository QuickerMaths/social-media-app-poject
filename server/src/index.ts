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

// Routes imports
import usersRoute from "./routes/api/usersRoute";
import postsRoute from "./routes/api/postsRoute";
import registerRoute from "./routes/api/registerRoute";
import loginRoute from "./routes/api/loginRoute";
import refreshRoute from "./routes/api/refreshRoute";
import logoutRoute from "./routes/api/loginRoute";

//connect to database
connectDB();

const app = express();

//build in middleware

// app.use(credentials);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

//routes

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/register", registerRoute);
app.use("/auth", loginRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);

// starting to listen only id connected to database

mongoose.connection
  .once("open", () => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .on("open", async () => {
    // find user with posts
    // const user = await User.findOne({ username: "Juby23" }).populate("posts");
    // create new post
    // const post = await Post.create({
    //   user: user?._id,
    //   postBody: "This is a test post910",
    // });
    // add posts to user
    // await user?.updateOne({ $push: { posts: post?._id } });
    // const userWithPosts = await User.findOne({ username: "juby1" });
    // console.log(userWithPosts);
  });
