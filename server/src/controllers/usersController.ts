import { Request, Response } from "express";
import User from "../models/Users";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  if (!users) return res.status(204).json({ message: "No users found" });

  res.status(200).json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Id is required" });

  const updateUser = await User.findByIdAndUpdate(req?.body?.id, {
    $set: req.body,
  }).exec();

  res.status(201).json(updateUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Id is required" });

  const deleteUser = await User.findByIdAndDelete(req?.body?.id).exec();

  res.status(204).json(deleteUser);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(204).json({ message: "No user with matching ID" });

  res.status(200).json(user);
};
