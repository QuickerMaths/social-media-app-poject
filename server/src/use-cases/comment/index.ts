import commentDb from "../../data-access/comment/index.ts";
import makeCreateCommentUseCase from "./create-comment.use-case.ts";
import makeUpdateCommentUseCase from "./update-comment.use-case.ts";
import makeDeleteCommentUseCase from "./delete-comment.use-case.ts";
import makeLikeCommentUseCase from "./like-comment.use-case.ts";

const createCommentUseCase = makeCreateCommentUseCase({
  commentDataBase: commentDb
});
const updateCommentUseCase = makeUpdateCommentUseCase({
  commentDataBase: commentDb
});
const deleteCommentUseCase = makeDeleteCommentUseCase({
  commentDataBase: commentDb
});
const likeCommentUseCase = makeLikeCommentUseCase({
  commentDataBase: commentDb
});

const commentUseCase = Object.freeze({
  createCommentUseCase,
  updateCommentUseCase,
  deleteCommentUseCase,
  likeCommentUseCase
});

export default commentUseCase;
