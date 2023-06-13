import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controllers/usersController";

router.route("/").get(getUsers).put(updateUser).delete(deleteUser);

router.route("/:id").get(getUserById);
export default router;
