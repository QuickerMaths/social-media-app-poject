import {
  CommentCreateDataType,
  CommentUpdateDataType
} from "../../data-access/comment/types.ts";
import IPostComment from "../tables/post_comment.interface.ts";

export default interface ICommentDB {
  getCommentsByPostId: ({
    postId,
    userId,
    page,
    pageSize
  }: {
    postId: number;
    userId?: number;
    page: number;
    pageSize: number;
  }) => Promise<IPostComment[]>;
  createComment: ({
    commentCreateData
  }: {
    commentCreateData: CommentCreateDataType;
  }) => Promise<IPostComment>;
  updateComment: ({
    commentId,
    commentUpdateData
  }: {
    commentId: number;
    commentUpdateData: CommentUpdateDataType;
  }) => Promise<IPostComment>;
  deleteComment: ({ commentId }: { commentId: number }) => Promise<{}>;
  likeComment: ({
    commentId,
    userId
  }: {
    commentId: number;
    userId: number;
  }) => Promise<IPostComment>;
}
