import { IPost, IRePost } from "../../components/post/types";

export type IResponse<K, T> = {
  status: K;
  data: T;
};

export type ICreatePost = Partial<
  Pick<IPost, "postBody" | "postImage" | "_id" | "isRePost">
>;

export type ICreateRePost = Partial<
  Pick<IRePost, "postBody" | "originalPost" | "_id" | "isRePost">
>;

export type ICreatePostParams = {
  postBody: string;
  _id: string;
  isRePost: boolean;
  originalPost?: string;
  postImage?: string;
};
