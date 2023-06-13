import User from "../models/Users";

export const handleLogout = async (req: any, res: any) => {
  const cookies = req.cookies;

  if (!cookies[`${process.env.FRONTEND_DOMAIN}_refresh`])
    return res.sendStatus(401);

  const refreshToken = cookies[`${process.env.FRONTEND_DOMAIN}_refresh`];
  const user = await User.findOne({ refreshToken }).exec();

  if (!user) {
    res.clearCookies(`${process.env.FRONTEND_DOMAIN}_refresh`, {
      httpOnly: true,
    });
    return res.sendStatus(204);
  }

  await user.updateOne({ refreshToken: "" }).exec();

  res.clearCookies(`${process.env.FRONTEND_DOMAIN}_refresh`, {
    httpOnly: true,
  });
  return res.sendStatus(204);
};
