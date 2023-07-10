import { Request, Response } from "express";
import {
  getAllUsersService,
  updateUserService,
  deleteUserService,
  getUserByIdService,
  uploadUserImageService,
} from "../services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsersService();

  if (!users)
    return res
      .status(204)
      .json({ status: "FAILED", data: { error: "No users found" } });

  res.status(200).json({ status: "OK", data: users });
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId, addressToUpdate } = req.body;

  if (!userId)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "User id is required" } });

  const updatedUser = await updateUserService(userId, addressToUpdate);

  res.status(201).json({ status: "OK", data: updatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "User id is required" } });

  const deletedUser = await deleteUserService(userId);

  res.status(204).json({ status: "OK", data: deletedUser });
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await getUserByIdService(req.params.id);

  if (!user)
    return res
      .status(204)
      .json({ status: "FAILED", data: { error: "No user with matching id" } });

  res.status(200).json({ status: "OK", data: user });
};

export const uploadUserImage = async (req: Request, res: Response) => {
  if (!req?.body?.path && req?.body?.path !== null)
    return res
      .status(400)
      .json({ status: "FILED", data: { error: "Image is required" } });

  const user = await uploadUserImageService(req.body.id, req.body.path);

  if (!user)
    return res
      .status(400)
      .json({ status: "FILED", data: { error: "No user with matching id" } });

  res.status(201).json({ status: "OK", data: user });
};
