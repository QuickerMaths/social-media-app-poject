import commentDb from "../../data-access/comment/index.ts";
import { CommentUpdateDataType } from "../../data-access/comment/types.ts";

export default function makeUpdateCommentUseCase({
  comment
}: {
  comment: typeof commentDb;
}) {
  return async function updateCommentUseCase({
    commentId,
    commentUpdateData
  }: {
    commentId: number;
    commentUpdateData: CommentUpdateDataType;
  }) {
    //TODO: validation
    const updatedComment = await comment.updateComment({
      commentId,
      commentUpdateData
    });

    return updatedComment;
  };
}
