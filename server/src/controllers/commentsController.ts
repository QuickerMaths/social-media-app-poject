import { Request, Response } from "express";
import Comment from "../models/Comments";

export const createComment = async (req: Request, res: Response) => {
  const { postId, userId, commentBody } = req.body;

  if (!commentBody || !userId || !postId)
    return res
      .status(400)
      .json({ message: "Comment body, postId and userId required" });

  const comment = await Comment.create({
    owner: userId,
    commentBody,
  });

  res.status(201).json(comment);
};
