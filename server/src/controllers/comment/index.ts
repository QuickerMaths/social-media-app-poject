import commentUseCase from "../../use-cases/comment/index.ts";
import makeCreateCommentController from "./create-comment.controller.ts";
import makeUpdateCommentController from "./update-comment.controller.ts";
import makeDeleteCommentController from "./delete-comment.controller.ts";
import makeLikeCommentController from "./like-comment.controller.ts";

const createCommentController = makeCreateCommentController({
  useCase: commentUseCase.createCommentUseCase
});
const updateCommentController = makeUpdateCommentController({
  useCase: commentUseCase.updateCommentUseCase
});
const deleteCommentController = makeDeleteCommentController({
  useCase: commentUseCase.deleteCommentUseCase
});
const likeCommentController = makeLikeCommentController({
  useCase: commentUseCase.likeCommentUseCase
});

const commentController = Object.freeze({
  createCommentController,
  updateCommentController,
  deleteCommentController,
  likeCommentController
});

export default commentController;
