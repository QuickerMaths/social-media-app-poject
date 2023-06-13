import User from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Missing information. Username and password required" });

  const user = await User.findOne({ username }).exec();

  if (!user) return res.sendStatus(401);

  const match = await bcrypt.compare(password, user.password!);
  if (match) {
    //Create JWTs
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "10min",
    });
    const refreshToken = jwt.sign(
      { username },
      process.env.JTW_REFRESH_SECRET!,
      { expiresIn: "1d" }
    );

    //Saving refreshToken in database
    await user.updateOne({ refreshToken }).exec();

    //Sending tokens to client in httpOnly cookies
    // res.cookie(`${process.env.FRONTEND_DOMAIN}_token`, token, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 24,
    // });
    res.cookie(`${process.env.FRONTEND_DOMAIN}_refresh`, refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json(token);
  }
};
