import { Request, Response, NextFunction } from "express";
import config from "./config/config.ts";
import createServer from "./server.ts";
import db from "../db/db.ts";
import logger from "./helpers/logger.ts";
import { BaseError } from "./utils/errors/BaseError.ts";

const app = createServer();

// Error handling

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log("test");
  logger().error(error.message);

  if (error instanceof BaseError) {
    return res.status(error.code).send({
      statusCode: error.code,
      body: {
        error: error.message
      }
    });
  }

  if (error instanceof Error && error.message === "Invalid token") {
    //TODO: changed accessToken and refreshToken to global variables
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    console.log("ok");

    return res.status(401).send({
      statusCode: 401,
      body: {
        error: "Invalid token"
      }
    });
  }
});

// Uncaught exception handling

process.on("uncaughtException", (error) => {
  logger().error("ok");

  process.exit(1);
});

// Connect to database and start server

await db
  .ping()
  .then(() => {
    logger().info("Database connected");
    app.listen(config.server.port, () => {
      logger().info(`Server started on port ${config.server.port}`);
    });
  })
  .catch((err) => {
    logger().error("Database connection failed");
    logger().error(err);
  });
