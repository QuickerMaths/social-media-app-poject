import express from "express";
import cors from "cors";
import logger from "./helpers/logger.ts";
import postDb from "./data-access/post/index.ts";
import commentDb from "./data-access/comment/index.ts";

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
    // const commentUpdateData = {
    //   comment_text: "updated comment text"
    // };
    const post = await postDb.selectAllPosts({
      page: 10,
      pageSize: 10
    });

    // const post = await postDb.selectAllPosts({
    //   userId: 100,
    //   page: 1,
    //   pageSize: 10
    // });
    console.log(post);
    res.send(post[9].comments);
  });

  return app;
}

export default createServer;
