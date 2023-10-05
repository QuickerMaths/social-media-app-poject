import config from "./config/config.ts";
import createServer from "./server.ts";
import connection from "../db/db.ts";
import logger from "./helpers/logger.ts";
import { Request, Response, NextFunction } from "express";

const app = createServer();

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger().error(err.message);

  return res.status(500).send({
    statusCode: 500,
    body: {
      error: err.message
    }
  });
});

// Uncaught exception handling

process.on("uncaughtException", (error) => {
  logger().error(error);
  process.exit(1);
});

//connect to database and start server

await connection
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
