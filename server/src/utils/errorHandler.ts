import { MongoError } from "mongodb";
import { Error } from "mongoose";

//TODO: what is this? why is it here?

const errorHandler = (error: any, res: any) => {
  if (error instanceof Error.ValidationError) {
    // const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({
      status: "FAILED",
      data: { error: "Could not create user due to some invalid fields!" },
    });
  } else if ((error as MongoError).code === 11000) {
    return res.status(400).json({
      status: "FAILED",
      data: { error: "A user with this unique key already exists!" },
    });
  }
  return res
    .status(500)
    .json({ status: "FAILED", data: { error: "Internal server error" } });
};

export default errorHandler;
