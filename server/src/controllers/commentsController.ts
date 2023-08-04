import { Request, Response } from "express";
import Comment from "../models/Comments";
import Post from "../models/Posts";
import RePost from "../models/RePosts";

export const createComment = async (req: Request, res: Response) => {
  const { postId, userId, commentBody, isRePost } = req.body;

  if (!commentBody || !userId || !postId || isRePost === null)
    return res.status(400).json({
      status: "FAILED",
      data: {
        error: "Comment body, postId, userId and isRePost are required",
      },
    });

  const comment = await Comment.create({
    owner: userId,
    commentBody,
    postId,
    belongsToRePost: isRePost,
  });

  let post;

  if (isRePost) {
    post = await RePost.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: comment._id },
      }
    ).exec();
  } else {
    post = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: comment._id },
      }
    ).exec();
  }

  res.status(201).json({ status: "OK", data: { comment, post } });
};

export const deletedComment = async (req: Request, res: Response) => {
  const { commentId, postId } = req.body;

  if (!commentId || !postId)
    return res.status(400).json({
      status: "FAILED",
      data: {
        error: "Comment and post Id required",
      },
    });

  const comment = await Comment.findByIdAndDelete({ _id: commentId }).exec();

  if (!comment)
    return res.status(404).json({
      status: "FAILED",
      data: {
        error: "No comment with matching id",
      },
    });

  let post;

  if (comment.belongsToRePost) {
    post = await RePost.findOneAndUpdate(
      { _id: postId },
      {
        $pull: { comments: commentId },
      }
    ).exec();
  } else {
    post = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: { comments: commentId },
      }
    ).exec();
  }

  if (!post)
    return res.status(404).json({
      status: "FAILED",
      data: {
        error: "No post with matching id",
      },
    });

  const deletedComment = await comment.deleteOne();

  res.status(204).json({ status: "OK", data: deletedComment });
};

export const likeComment = async (req: Request, res: Response) => {
  const { commentId, userId } = req.body;

  if (!commentId || !userId)
    return res.status(400).json({
      status: "FAILED",
      data: {
        error: "Comment and user Id required",
      },
    });

  const comment = await Comment.findOne({ _id: commentId });

  if (!comment)
    return res.status(404).json({
      status: "FAILED",
      data: {
        error: "No comment with matching id",
      },
    });

  if (comment.likedBy.includes(userId)) {
    await comment.updateOne({ $pull: { likedBy: userId } }).exec();
  } else {
    await comment.updateOne({ $push: { likedBy: userId } }).exec();
  }

  res.status(200).json({ status: "OK", data: comment });
};
