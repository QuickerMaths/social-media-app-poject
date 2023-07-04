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
        validator.isAlphanumeric,
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
    },
    firstName: {
      type: String,
      require: [true, "FirstName is required"],
    },
    lastName: {
      type: String,
      require: [true, "LastName is required"],
    },
    profilePicture: {
      type: String || null,
      default: null,
    },
    friends: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
      default: [],
    },
    friendsRequests: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
      default: [],
    },
    address: {
      type: Object,
      default: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    },
    refreshToken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
