import express from "express";
import userController from "../controllers/user/index.ts";
import expressCallback from "../helpers/expressCallback.ts";

const router = express.Router();

const {
  selectUserByIdController,
  selectAllUsersController,
  selectAllUserFriendsController,
  createUserController,
  updateUserController,
  deleteUserController
} = userController;

router
  .get("/:userId", expressCallback(selectUserByIdController))
  .get("/", expressCallback(selectAllUsersController))
  .get("/:userId/friends", expressCallback(selectAllUserFriendsController))
  .post("/", expressCallback(createUserController))
  .patch("/:userId", expressCallback(updateUserController))
  .delete("/:userId", expressCallback(deleteUserController));

export default router;
