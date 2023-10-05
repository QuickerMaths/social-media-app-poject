import express from "express";
import cors from "cors";
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

  app.get("/", async (_req, res) => {
    logger().info("Hello World");
    res.send("Hello World");
  });

  return app;
}

export default createServer;
