import { Request, Response } from "express";
import Post from "../models/Posts";
import RePost from "../models/RePosts";

export const createRePost = async (req: Request, res: Response) => {
  const { postId, userId, postBody } = req.body;

  if (!postId || !userId)
    return res.status(400).json({ message: "Post Id and user Id required" });

  const rePost = await RePost.create({
    originalPost: postId,
    owner: userId,
    postBody,
  });

  res.status(201).json(rePost);
};

export const deleteRePost = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;

  if (!postId || !userId)
    return res.status(400).json({ message: "Post Id and user Id required" });

  const rePost = await RePost.findOneAndDelete({ _id: postId }).exec();

  res.status(204).json(rePost);
};
