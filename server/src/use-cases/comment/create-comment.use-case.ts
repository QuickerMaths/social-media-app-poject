import commentDb from "../../data-access/comment/index.ts";
import { CommentCreateDataType } from "../../data-access/comment/types.ts";

export default function makeCreateCommentUseCase({
  commentDataBase
}: {
  commentDataBase: typeof commentDb;
}) {
  return async function createCommentUseCase({
    userId,
    commentCreateData
  }: {
    userId: number;
    commentCreateData: CommentCreateDataType;
  }) {
    const createdComment = await commentDataBase.createComment({
      userId,
      commentCreateData
    });

    return createdComment;
  };
}
