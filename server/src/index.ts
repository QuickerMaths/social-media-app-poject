import { Request, Response, NextFunction } from "express";
import config from "./config/config.ts";
import createServer from "./server.ts";
import db from "../db/db.ts";
import logger from "./helpers/logger.ts";
import { BaseError } from "./utils/errors/BaseError.ts";
import InvalidTokenError from "./utils/errors/InvalidTokenError.ts";

const app = createServer();

// Error handling

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger().error(error.message);
  console.log(error.stack);

  if (error instanceof InvalidTokenError) {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    return res.status(401).send({
      statusCode: 401,
      body: {
        error: "Invalid token"
      }
    });
  }

  if (error instanceof BaseError) {
    return res.status(error.statusCode).send({
      statusCode: error.statusCode,
      body: {
        error: error.message
      }
    });
  }

  if (error instanceof BaseError && !error.operational) {
    process.exit(1);
  }
});

// Uncaught exception handling

process.on("uncaughtException", (error) => {
  logger().error(error.message);

  if (error instanceof Error) {
    process.exit(1);
  }
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
