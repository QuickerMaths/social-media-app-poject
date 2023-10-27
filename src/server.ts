import express from "express";
import cors from "cors";
import logger from "./helpers/logger.ts";
import postRouter from "./route/post.route.ts";
import userRouter from "./route/user.route.ts";
import commentRouter from "./route/comment.route.ts";
import authRouter from "./route/auth.route.ts";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      credentials: true,
      origin: true
    })
  );

  app.use("/api/post", postRouter);
  app.use("/api/user", userRouter);
  app.use("/api/comment", commentRouter);
  app.use("/api/auth", authRouter);

  return app;
}

export default createServer;
