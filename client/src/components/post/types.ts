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
  comments: IComment[];
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
  originalPost: IPost;
  likedBy: string[];
  commentTotal: number;
  comments: IComment[];
  isRePost: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
};
