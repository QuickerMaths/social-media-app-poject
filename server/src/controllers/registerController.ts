import { Request, Response } from "express";
import User from "../models/Users";
import bcrypt from "bcrypt";

export const handleRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({
      message: "Missing information. Username, email and password required",
    });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPwd,
    });
    res.status(201).json(newUser);
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
