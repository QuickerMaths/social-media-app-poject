import commentDb from "../../data-access/comment/index.ts";
import { CommentUpdateDataType } from "../../data-access/comment/types.ts";

export default function makeUpdateCommentUseCase({
  commentDataBase
}: {
  commentDataBase: typeof commentDb;
}) {
  return async function updateCommentUseCase({
    commentId,
    commentUpdateData
  }: {
    commentId: number;
    commentUpdateData: CommentUpdateDataType;
  }) {
    //TODO: validation
    const updatedComment = await commentDataBase.updateComment({
      commentId,
      commentUpdateData
    });

    return updatedComment;
  };
}
