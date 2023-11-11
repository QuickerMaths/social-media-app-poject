import config from "./config/config.ts";
import createServer from "./server.ts";
import db from "../db/db.ts";
import logger from "./helpers/logger.ts";
import { Request, Response, NextFunction } from "express";
import { BaseError } from "./utils/errors/BaseError.ts";

const app = createServer();

// Error handling

app.use(
  (
    err: BaseError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    logger().error(err.message);

    if (err instanceof BaseError) {
      return res.status(err.code).send({
        statusCode: err.code,
        body: {
          error: err.message
        }
      });
    }

    process.exit(1);
  }
);

// Uncaught exception handling

process.on("uncaughtException", (error) => {
  logger().error(error);
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
