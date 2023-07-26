import { IPost, IRePost } from "../../components/post/types";
import { IUserBasicData } from "../../pages/user-profile/types";

export type IResponse<K, T> = {
  status: K;
  data: T;
};

export type IRePostOrPost = Pick<IPost | IRePost, "isRePost" | "_id">;

export type IPostPick = Partial<
  Pick<IPost, "postBody" | "postImage" | "_id" | "isRePost">
>;

export type IRePostPick = Partial<
  Pick<IRePost, "postBody" | "originalPost" | "_id" | "isRePost">
>;

export type ICreatePostParams = {
  postBody: string;
  _id: string;
  isRePost: boolean;
  originalPost?: string;
  postImage?: string;
};

export type IAuthResponse = {
  username: string | null;
  userId: string | null;
  userImg: string | null;
  friendsRequests: string[] | [];
};

export type IAuthProps = {
  username: string;
  password: string;
};

export type IRequest = IUserBasicData;

export type IFriendsRequestResponse = {
  _id: string;
  friendsRequests: IRequest[];
};
