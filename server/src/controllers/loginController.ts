import User from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleUserAuth = async (req: any, res: any) => {
  const cookie = req.cookies[`${process.env.FRONTEND_DOMAIN}`];

  if (!cookie) return;

  jwt.verify(
    cookie,
    process.env.JTW_REFRESH_SECRET!,
    async (err: any, decoded: any) => {
      if (err)
        return res.status(403).json({
          status: "FAILED",
          data: {
            error: "Forbidden",
          },
        });

      const user = await User.findOne({ username: decoded.username }).exec();

      res.status(200).json({
        status: "OK",
        data: {
          username: decoded.username,
          userId: decoded.userId,
          userImg: user?.profilePicture,
          friendsRequests: user?.friendsRequests,
        },
      });
    }
  );
};

export const handleLogin = async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({
        status: "FAILED",
        data: { error: "Missing information. Username and password required" },
      });

  const user = await User.findOne({ username }).exec();

  if (!user)
    return res.status(401).json({
      status: "FAILED",
      data: {
        error: "Unauthorized",
      },
    });

  const match = await bcrypt.compare(password, user.password!);
  if (match) {
    //Create JWTs
    const token = jwt.sign(
      { username, userId: user._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10min",
      }
    );
    const refreshToken = jwt.sign(
      { username, userId: user._id },
      process.env.JTW_REFRESH_SECRET!,
      { expiresIn: "1d" }
    );

    //Saving refreshToken in database
    await user.updateOne({ refreshToken }).exec();

    // Sending token to client in httpOnly cookies
    res.cookie(`${process.env.FRONTEND_DOMAIN}`, refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      status: "OK",
      data: {
        username,
        userId: user._id,
        userImg: user.profilePicture,
        friendsRequests: user.friendsRequests,
      },
    });
  }
};
