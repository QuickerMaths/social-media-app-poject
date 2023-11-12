import { Response, Request, NextFunction } from "express";

interface IController {
  (httpRequest: any): Promise<IResponse>;
}
interface IResponse {
  statusCode: number;
  body: any;
  cookies?: { name: string; value: string; options: any }[];
}

export default (controller: IController) =>
  (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      query: req.query,
      params: req.params,
      body: req.body,
      cookies: req.cookies,
      path: req.path,
      user: req.user
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse?.cookies) {
          httpResponse.cookies.forEach(({ name, value, options }) => {
            res.cookie(name, value, options);
          });
        }

        if (httpRequest?.path === "/logout") {
          res.clearCookie("refreshToken");
          res.clearCookie("accessToken");
        }

        return res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(next);
  };
