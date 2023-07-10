import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
} from "../../controllers/usersController";

router.route("/").get(getAllUsers).put(updateUser).delete(deleteUser);

router.route("/uploads").put(uploadUserImage);

router.route("/:id").get(getUserById);

export default router;
