import {
  PostCreateDataType,
  PostUpdateDataType,
  PostWithCommentsType
} from "../../data-access/post/types.ts";
import IUserPost from "../tables/user_post.interface.ts";

export default interface IPostDB {
  selectAllPosts: ({
    page,
    pageSize,
    userId
  }: {
    page: number;
    pageSize: number;
    userId?: number | undefined;
  }) => Promise<PostWithCommentsType[]>;
  selectPostsByUserId: ({
    userId,
    page,
    pageSize
  }: {
    userId: number;
    page: number;
    pageSize: number;
  }) => Promise<IUserPost[]>;
  createPost: ({
    postCreateData
  }: {
    postCreateData: PostCreateDataType;
  }) => Promise<IUserPost>;
  updatePost: ({
    postId,
    postUpdateData
  }: {
    postId: number;
    postUpdateData: PostUpdateDataType;
  }) => Promise<IUserPost>;
  deletePost: ({ postId }: { postId: number }) => Promise<{}>;
  likePost: ({
    userId,
    postId
  }: {
    userId: number;
    postId: number;
  }) => Promise<IUserPost>;
}
