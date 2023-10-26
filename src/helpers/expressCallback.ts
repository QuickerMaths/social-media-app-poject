import { Response, Request, NextFunction } from "express";

interface IController {
  (httpRequest: any): Promise<IResponse>;
}

interface IResponse {
  statusCode: number;
  body: any;
}

export default (controller: IController) =>
  (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      query: req.query,
      params: req.params,
      body: req.body
    };

    controller(httpRequest)
      .then((httpResponse) => {
        console.log(httpResponse);

        return res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(next);
  };
