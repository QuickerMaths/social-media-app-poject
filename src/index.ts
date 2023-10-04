import config from "./config/config.ts";
import createServer from "./server.ts";
import connection from "../db/db.ts";
import { Request, Response, NextFunction } from "express";

const app = createServer();

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).send({
    statusCode: 500,
    body: {
      error: err.message
    }
  });
});

// Uncaught exception handling

process.on("uncaughtException", (error) => {
  console.log(error);
});

await connection
  .ping()
  .then(() => {
    console.log("Database connected");
    app.listen(config.server.port, () => {
      console.log(`Server is listening on port ${config.server.port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err);
  });
