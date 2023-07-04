import { Request, Response } from "express";
import Post from "../models/Posts";
import RePost from "../models/RePosts";
import Comment from "../models/Comments";

export const createRePost = async (req: Request, res: Response) => {
  const { postId, userId, postBody } = req.body;

  if (!postId || !userId)
    return res.status(400).json({ message: "Post Id and user Id required" });

  const post = await Post.findOne({ _id: postId });

  if (!post)
    return res.status(404).json({ message: "No post with matching Id" });

  const rePost = await RePost.create({
    originalPost: postId,
    owner: userId,
    postBody,
  });

  post.rePostsCount += 1;
  await post.save();

  res.status(201).json(rePost);
};

// TODO: somehow figure out the way to refactor like, update and delete controllers for rePosts and Posts to make it DRY

export const likeRePost = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;

  if (!postId || !userId)
    return res
      .status(400)
      .json({ message: "Post Id and user Id are required" });

  const rePost = await RePost.findOne({ _id: postId });

  if (!rePost) return res.status(404).json({ message: "rePost not found!" });

  if (rePost.likedBy.includes(userId)) {
    await rePost.updateOne({ $pull: { likedBy: userId } }).exec();
  } else {
    await rePost.updateOne({ $push: { likedBy: userId } }).exec();
  }

  return res.status(201).json(rePost);
};

export const deleteRePost = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;

  if (!postId || !userId)
    return res.status(400).json({ message: "Post Id and user Id required" });

  const rePost = await RePost.findById(postId);

  if (!rePost)
    return res.status(204).json({ message: "No post with matching Id" });

  const deletedRePost = await rePost.deleteOne();

  await Comment.deleteMany({ _id: { $in: rePost.comments } });

  res.status(204).json(deletedRePost);
};