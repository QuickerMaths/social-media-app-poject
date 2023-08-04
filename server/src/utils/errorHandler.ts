import { MongoError } from "mongodb";
import { Error } from "mongoose";

//TODO: what is this? why is it here?

const errorHandler = (error: any, res: any) => {
  if (error instanceof Error.ValidationError) {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({
      message: "Could not create user due to some invalid fields!",
      error: messages,
    });
  } else if ((error as MongoError).code === 11000) {
    return res.status(400).json({
      message: `A user with this unique key already exists!`,
      error,
    });
  }
  return res.status(500).json({ message: "Internal server error", error });
};

export default errorHandler;
