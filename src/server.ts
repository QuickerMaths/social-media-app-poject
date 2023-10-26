import express from "express";
import cors from "cors";
import logger from "./helpers/logger.ts";
import postRouter from "./route/post.route.ts";

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

  app.use("/post", postRouter);

  return app;
}

export default createServer;
