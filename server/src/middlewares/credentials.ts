import { allowedOrigins } from "../config/allowedOrigins";

const credentials = (req: any, res: any, next: any) => {
  const origin = req.headers.Origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    console.log(origin);
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
