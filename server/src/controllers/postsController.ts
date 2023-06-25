import { Request, Response } from "express";
import Post from "../models/Posts";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate(
    "owner",
    "_id username profilePicture"
  );

  if (!posts) return res.status(204).json({ message: "No posts found" });

  res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { postBody, userId } = req.body;

  if (!postBody || !userId)
    return res.status(400).json({ message: "Post body and userId required" });

  const post = await Post.create({
    postBody,
    owner: userId,
  });

  res.status(201).json(post);
};

export const likePost = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;

  if (!postId || !userId)
    return res
      .status(400)
      .json({ message: "Post Id and user Id are required" });

  const post = await Post.findOne({ _id: postId });

  if (!post) return res.status(404).json({ message: "Post not found!" });

  if (post.likedBy.includes(userId)) {
    await post.updateOne({ $pull: { likedBy: userId } }).exec();
  } else {
    await post.updateOne({ $push: { likedBy: userId } }).exec();
  }

  await post.save();

  return res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { postId, postBody, userId } = req.body;

  if (!postId || !postBody || !userId)
    return res
      .status(400)
      .json({ message: "Id, userId and post body required" });

  const post = await Post.findById(postId);

  if (!post)
    return res.status(204).json({ message: "No post with matching id" });

  if (post.owner!.toString() !== userId)
    return res.status(403).json({ message: "Unauthorized" });

  const updatedPost = await post.updateOne({ $set: { postBody } });

  res.status(201).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;

  if (!postId || !userId)
    return res.status(400).json({ message: "Post Id and user Id required" });

  const post = await Post.findById(postId);

  if (!post)
    return res.status(204).json({ message: "No post with matching Id" });

  if (post.owner!.toString() !== userId)
    return res.status(403).json({ message: "Unauthorized" });

  const deletedPost = await post.deleteOne();

  res.status(204).json(deletedPost);
};

export const getPostsByUser = async (req: Request, res: Response) => {
  const posts = await Post.find({ owner: req.params.id }).populate(
    "owner",
    "_id username profilePicture"
  );

  if (!posts) return res.status(204).json({ message: "No posts found" });

  res.status(200).json({ posts });
};
