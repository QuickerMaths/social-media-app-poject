export const setBearer = async (req: any, res: any, next: any) => {
  if (req.url.startsWith("/api")) {
    const cookie = req.cookies[`${process.env.FRONTEND_DOMAIN}`];

    req.headers.authorization = `Bearer ${cookie}`;
  }
  next();
};
