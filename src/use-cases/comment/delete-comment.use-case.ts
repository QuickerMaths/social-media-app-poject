import commentDb from "../../data-access/comment/index.ts";

export default function makeDeleteCommentUseCase({
  comment
}: {
  comment: typeof commentDb;
}) {
  return async function deleteCommentUseCase({
    commentId
  }: {
    commentId: number;
  }) {
    const deletedComment = await comment.deleteComment({ commentId });

    return deletedComment;
  };
}
