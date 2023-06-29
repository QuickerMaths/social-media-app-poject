import { Request, Response } from "express";
import Post from "../models/Posts";
import RePost from "../models/RePosts";
import Comment from "../models/Comments";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate([
    {
      path: "owner",
      select: "_id username profilePicture",
      model: "User",
    },
    {
      path: "comments",
      model: "Comment",
      options: {
        limit: 2,
        sort: { _id: -1 },
      },
      populate: {
        path: "owner",
        select: "_id username profilePicture",
        model: "User",
      },
    },
  ]);

  const rePosts = await RePost.find().populate([
    {
      path: "owner",
      select: "_id username profilePicture",
      model: "User",
    },
    {
      path: "originalPost",
      select: "_id owner postBody postImage likedBy commentTotal rePostCount",
      model: "Post",
    },
  ]);

  const allPosts = [...posts, ...rePosts];

  if (!allPosts) return res.status(204).json({ message: "No posts found" });

  res.status(200).json(allPosts);
};

export const createPost = async (req: Request, res: Response) => {
  const { postBody, postImage, userId } = req.body;

  if (!postBody || !userId)
    return res.status(400).json({ message: "Post body and userId required" });

  const post = await Post.create({
    postBody,
    owner: userId,
    postImage,
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

  return res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { postId, postBody, postImage, userId } = req.body;

  if (!postId || !postBody || !userId)
    return res
      .status(400)
      .json({ message: "Id, userId and post body required" });

  const post = await Post.findById(postId);

  if (!post)
    return res.status(204).json({ message: "No post with matching id" });

  if (post.owner!.toString() !== userId)
    return res.status(403).json({ message: "Unauthorized" });

  const updatedPost = await post.updateOne({ $set: { postBody, postImage } });

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

  await Comment.deleteMany({ _id: { $in: post.comments } });

  res.status(204).json(deletedPost);
};

export const getPostsByUser = async (req: Request, res: Response) => {
  const posts = await Post.find({ owner: req.params.id }).populate([
    {
      path: "owner",
      select: "_id username profilePicture",
      model: "User",
    },
    {
      path: "comments",
      model: "Comment",
      options: {
        limit: 2,
        sort: { _id: -1 },
      },
      populate: {
        path: "owner",
        select: "_id username profilePicture",
        model: "User",
      },
    },
  ]);

  if (!posts) return res.status(204).json({ message: "No posts found" });

  res.status(200).json({ posts });
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await Post.find({ _id: req.params.id }).populate([
    {
      path: "owner",
      select: "_id username profilePicture",
      model: "User",
    },
    {
      path: "comments",
      model: "Comment",
      options: {
        sort: { _id: -1 },
      },
      populate: {
        path: "owner",
        select: "_id username profilePicture",
        model: "User",
      },
    },
  ]);

  if (!post) return res.status(204).json({ message: "No posts found" });

  res.status(200).json({ post });
};

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
