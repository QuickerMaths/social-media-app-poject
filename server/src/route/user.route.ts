import express from "express";
import userController from "../controllers/user/index.ts";
import expressCallback from "../helpers/expressCallback.ts";
import readCredentialsMiddleware from "../middleware/readCredentialsMiddleware.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = express.Router();

const {
  selectUserByIdController,
  selectAllUsersController,
  selectAllUserFriendsController,
  updateUserController,
  deleteUserController,
  selectAllRequestsController,
  sendFriendRequestController
} = userController;

router
  .get(
    "/:userId",
    readCredentialsMiddleware,
    expressCallback(selectUserByIdController)
  )
  .get("/", expressCallback(selectAllUsersController))
  .get("/:userId/friends", expressCallback(selectAllUserFriendsController))
  .patch("/:userId", expressCallback(updateUserController))
  .delete("/:userId", expressCallback(deleteUserController))
  .get(
    "/:userId/requests",
    authMiddleware,
    authMiddleware,
    expressCallback(selectAllRequestsController)
  )
  .post(
    "/:responderId/send-request",
    authMiddleware,
    expressCallback(sendFriendRequestController)
  );
// .patch('/:responderId/:requesterId/accept-request', expressCallback(acceptFriendRequestController))
// .delete('/:responderId/:requesterId/reject-request', expressCallback(rejectFriendRequestController))
// .delete('/:responderId/:requesterId/delete-friend', expressCallback(deleteFriendController))

export default router;
