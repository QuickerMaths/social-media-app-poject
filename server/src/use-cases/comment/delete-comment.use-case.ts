import commentDb from "../../data-access/comment/index.ts";

export default function makeDeleteCommentUseCase({
  commentDataBase
}: {
  commentDataBase: typeof commentDb;
}) {
  return async function deleteCommentUseCase({
    commentId
  }: {
    commentId: number;
  }) {
    const deletedComment = await commentDataBase.deleteComment({ commentId });

    return deletedComment;
  };
}
