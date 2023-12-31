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
  sendFriendRequestController,
  acceptFriendRequestController,
  rejectFriendRequestController,
  deleteFriendshipController
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
  )
  .patch(
    "/:requesterId/accept-request",
    authMiddleware,
    expressCallback(acceptFriendRequestController)
  )
  .delete(
    "/:requesterId/reject-request",
    authMiddleware,
    expressCallback(rejectFriendRequestController)
  )
  .delete(
    "/:requesterId/delete-friendship",
    authMiddleware,
    expressCallback(deleteFriendshipController)
  );

export default router;
