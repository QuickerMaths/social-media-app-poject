import { IComment } from "../comment/types";

export type IPost = {
  createdAt: string;
  likedBy: string[];
  owner: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  postBody: string;
  postImage: string;
  updatedAt: string;
  commentTotal: number;
  comments: IComment[];
  __v: number;
  _id: string;
  isRePost: boolean;
};

export type IRePost = {
  owner: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  postBody: string;
  post: IPost;
  likedBy: string[];
  commentTotal: number;
  comments: IComment[];
  isRePost: boolean;
};
