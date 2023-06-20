import { Request, Response } from "express";
import User from "../models/Users";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies[`${process.env.FRONTEND_DOMAIN}`]) return res.sendStatus(401);

  const refreshToken = cookies[`${process.env.FRONTEND_DOMAIN}`];

  const user = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!,
    (err: any, decoded: any) => {
      if (err || user.username !== decoded.username) return res.sendStatus(403);

      const { username } = decoded;

      const token = jwt.sign(
        { username, userId: user._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "10min",
        }
      );

      res.json(token);
    }
  );
};
