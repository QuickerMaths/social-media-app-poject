import { Request, Response } from "express";
import Comment from "../models/Comments";
import Post from "../models/Posts";

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

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    {
      $push: { comments: comment._id },
    }
  ).exec();

  res.status(201).json({ comment, post });
};

export const deletedComment = async (req: Request, res: Response) => {
  const { commentId, postId } = req.body;

  if (!commentId || !postId)
    return res.status(400).json({ message: "Comment and post Id required" });

  const comment = await Comment.findByIdAndDelete({ _id: commentId }).exec();

  if (!comment)
    return res.status(204).json({ message: "No comment with matching id" });

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    {
      $pull: { comments: commentId },
    }
  ).exec();

  if (!post)
    return res.status(204).json({ message: "No post with matching id" });

  res.status(204).json({ comment });
};
