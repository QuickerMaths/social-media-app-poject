import commentDb from "../../data-access/comment/index.ts";

export default function makeLikeCommentUseCase({
  commentDataBase
}: {
  commentDataBase: typeof commentDb;
}) {
  return async function likeComment({
    commentId,
    userId
  }: {
    commentId: number;
    userId: number;
  }) {
    const likedComment = await commentDataBase.likeComment({
      commentId,
      userId
    });

    return likedComment;
  };
}
