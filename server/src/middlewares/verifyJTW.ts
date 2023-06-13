import jwt from "jsonwebtoken";

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.username;
    next();
  });
};
