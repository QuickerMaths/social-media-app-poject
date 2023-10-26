import commentDb from "../../data-access/comment/index.ts";

export default function makeLikeCommentUseCase({
  comment
}: {
  comment: typeof commentDb;
}) {
  return async function likeComment({
    commentId,
    userId
  }: {
    commentId: number;
    userId: number;
  }) {
    const likedComment = await comment.likeComment({ commentId, userId });

    return likedComment;
  };
}
