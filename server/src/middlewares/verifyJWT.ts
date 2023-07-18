import jwt from "jsonwebtoken";

//TODO: at then end swap verification for this JWT controller

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.JTW_REFRESH_SECRET!,
    (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = decoded.username;
      req.userId = decoded.userId;
      next();
    }
  );
};
