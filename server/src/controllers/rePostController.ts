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

  //TODO: use middleware fot this action
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

export const updateRePost = async (req: Request, res: Response) => {
  const { postId, postBody } = req.body;

  if (!postId || !postBody)
    return res.status(400).json({ message: "Post id and body are required" });

  const rePost = await RePost.findById(postId);

  if (!rePost)
    return res.status(204).json({ message: "No post with matching id" });

  const updatedRePost = await rePost.updateOne({ postBody });

  res.status(201).json(updatedRePost);
};

export const deleteRePost = async (req: Request, res: Response) => {
  const { _id: postId } = req.body;

  if (!postId) return res.status(400).json({ message: "Post Id is required" });

  const rePost = await RePost.findById(postId);

  if (!rePost)
    return res.status(204).json({ message: "No post with matching Id" });

  const originalPost = await Post.findOne({ _id: rePost.originalPost });

  if (originalPost) {
    //TODO: use middleware fot this action
    originalPost.rePostsCount -= 1;
    await originalPost.save();
  }

  const deletedRePost = await rePost.deleteOne();

  await Comment.deleteMany({ _id: { $in: rePost.comments } });

  res.status(204).json(deletedRePost);
};
