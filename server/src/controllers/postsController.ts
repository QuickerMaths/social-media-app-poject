import { Request, Response } from "express";
import Post from "../models/Posts";
import User from "../models/Users";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate("user");

  if (!posts) return res.status(204).json({ message: "No posts found" });

  res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { postBody, userId } = req.body;

  if (!postBody || !userId)
    return res.status(400).json({ message: "Post body and user id required" });

  const post = await Post.create({
    postBody,
    user: userId,
  });

  res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  //TODO: figure out how to protect this route to only allow the user who created the post to update it
  const { id, postBody, userId } = req.body;

  if (!id || !postBody || !userId)
    return res
      .status(400)
      .json({ message: "Id, userId and post body required" });

  const post = await Post.findById(id);

  if (!post)
    return res.status(204).json({ message: "No post with matching id" });

  if (post.user.toString() !== userId)
    return res.status(401).json({ message: "Unauthorized" });

  const updatedPost = await post.updateOne({ $set: { postBody } });

  res.status(201).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  //TODO: figure out how to protect this route to only allow the user who created the post to delete it
  const { id, userId } = req.body;

  if (!id || !userId)
    return res.status(400).json({ message: "Id and userId required" });

  const post = await Post.findById(id);

  if (!post)
    return res.status(204).json({ message: "No post with matching id" });

  if (post.user.toString() !== userId)
    return res.status(401).json({ message: "Unauthorized" });

  const deletedPost = await post.deleteOne();

  res.status(204).json(deletedPost);
};

export const getPostsByUser = async (req: Request, res: Response) => {
  const posts = await Post.find({ user: req.params.id });

  if (!posts) return res.status(204).json({ message: "No posts found" });

  res.status(200).json(posts);
};
