import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
} from "../../controllers/usersController";

router.route("/").get(getUsers).put(updateUser).delete(deleteUser);

router.route("/:id").get(getUserById);

router.route("/uploads/:id").put(uploadUserImage);

export default router;
