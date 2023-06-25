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
  const { postBody, userId, username } = req.body;

  if (!postBody || !userId || !username)
    return res
      .status(400)
      .json({ message: "Post body, userId and username required" });

  const post = await Post.create({
    postBody,
    owner: userId,
  });

  res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  //TODO: figure out how to protect this route to only allow the user who created the post to update it
  const { postId, postBody, userId } = req.body;

  if (!postId || !postBody || !userId)
    return res
      .status(400)
      .json({ message: "Id, userId and post body required" });

  const post = await Post.findById(postId);

  if (!post)
    return res.status(204).json({ message: "No post with matching id" });

  //TODO: figure out why post.ownerID is possibly undefined
  //@ts-ignore

  if (post.owner.toString() !== userId)
    return res.status(401).json({ message: "Unauthorized" });

  const updatedPost = await post.updateOne({ $set: { postBody } });

  res.status(201).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  //TODO: figure out how to protect this route to only allow the user who created the post to delete it
  const { postId, userId } = req.body;

  if (!postId || !userId)
    return res.status(400).json({ message: "Id and userId required" });

  const post = await Post.findById(postId);

  if (!post)
    return res.status(204).json({ message: "No post with matching id" });

  //TODO: figure out why post.ownerID is possibly undefined
  //@ts-ignore
  if (post.owner.toString() !== userId)
    return res.status(401).json({ message: "Unauthorized" });

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
