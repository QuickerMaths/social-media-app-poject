import { NextFunction } from "express";

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
};

export default errorHandler;
