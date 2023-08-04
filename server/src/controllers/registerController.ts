import { Request, Response } from "express";
import User from "../models/Users";
import bcrypt from "bcrypt";
import errorHandler from "../utils/errorHandler";

export const handleRegister = async (req: Request, res: Response) => {
  const { username, email, firstName, lastName, password } = req.body;

  if (!username || !email || !firstName || !lastName || !password)
    return res.status(400).json({
      status: "FAILED",
      data: {
        error:
          "Missing information. Username, email, first name, last name and password required",
      },
    });

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    firstName,
    lastName,
    password: hashedPwd,
  });
  res.status(201).json({ status: "OK", data: newUser });
};
