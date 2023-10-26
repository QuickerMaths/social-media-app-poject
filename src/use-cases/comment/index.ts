import commentDb from "../../data-access/comment/index.ts";
import makeCreateCommentUseCase from "./create-comment.use-case.ts";
import makeUpdateCommentUseCase from "./update-comment.use-case.ts";
import makeDeleteCommentUseCase from "./delete-comment.use-case.ts";
import makeLikeCommentUseCase from "./like-comment.use-case.ts";

const createCommentUseCase = makeCreateCommentUseCase({ comment: commentDb });
const updateCommentUseCase = makeUpdateCommentUseCase({ comment: commentDb });
const deleteCommentUseCase = makeDeleteCommentUseCase({ comment: commentDb });
const likeCommentUseCase = makeLikeCommentUseCase({ comment: commentDb });

const commentUseCase = Object.freeze({
  createCommentUseCase,
  updateCommentUseCase,
  deleteCommentUseCase,
  likeCommentUseCase
});

export default commentUseCase;
