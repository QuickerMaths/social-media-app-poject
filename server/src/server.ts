import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import postRouter from "./route/post.route.ts";
import userRouter from "./route/user.route.ts";
import commentRouter from "./route/comment.route.ts";
import authRouter from "./route/auth.route.ts";
import logger from "./helpers/logger.ts";

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
  app.use(cookieParser());
  app.use(
    morgan("tiny", {
      stream: {
        write: (text: string) => {
          logger().info(text);
        }
      }
    })
  );

  app.use("/api/post", postRouter);
  app.use("/api/user", userRouter);
  app.use("/api/comment", commentRouter);
  app.use("/api/auth", authRouter);

  return app;
}

export default createServer;
