import validator from "validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      minlength: [4, "Username must be at least 3 characters long"],
      maxlength: [20, "Username must be less than 20 characters long"],
      validate: [
        validator.isAlphanumerics,
        "Username can only contain letters and numbers",
      ],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [24, "Password must be less than 24 characters long"],
    },
    firstName: {
      type: String,
      validate: [validator.isAlpha, "First name can only contain letters"],
    },
    lastName: {
      type: String,
      validate: [validator.isAlpha, "First name can only contain letters"],
    },
    refreshToken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
