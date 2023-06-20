export const setBearer = async (req: any, res: any, next: any) => {
  if (req.url.startsWith("/api")) {
    const cookie = req.cookies[`${process.env.FRONTEND_DOMAIN}`];
    if (!cookie) return;

    req.headers.authorization = `Bearer ${cookie}`;
  }
  next();
};
