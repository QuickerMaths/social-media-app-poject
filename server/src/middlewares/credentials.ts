import { allowedOrigins } from "../config/allowedOrigins";

export const credentials = (req: any, res: any, next: any) => {
  const origin = res.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
};
