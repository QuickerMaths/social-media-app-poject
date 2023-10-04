import express from "express";
import cors from "cors";

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
    res.send("Hello World");
  });

  return app;
}

export default createServer;
