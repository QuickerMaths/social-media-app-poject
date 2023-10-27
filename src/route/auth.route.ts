import express from "express";
import userController from "../controllers/user/index.ts";

const router = express.Router();

const { createUserController } = userController;

router
  // .get('/me', authUserController)
  .post("/register", createUserController);
// .post('/login', loginUserController)
// .post('/logout', logoutUserController)

export default router;
