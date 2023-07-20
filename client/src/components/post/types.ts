import { EntityState } from "@reduxjs/toolkit";
import { IComment } from "../comment/types";

export type IPost = {
  likedBy: string[];
  owner: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  postBody: string;
  postImage: string | null;
  createdAt: string;
  updatedAt: string;
  commentTotal: number;
  comments: IComment[] | EntityState<IComment>;
  __v: number;
  _id: string;
  rePostsCount: number;
  isRePost: boolean;
};

export type IRePost = {
  owner: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  postBody: string;
  originalPost: IPost | string;
  likedBy: string[];
  commentTotal: number;
  comments: IComment[] | EntityState<IComment>;
  isRePost: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
};
