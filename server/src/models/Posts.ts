import User from "./Users";
import Comment from "./Comments";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Post owner is required"],
    },
    postBody: {
      type: String,
      required: [true, "Post body is required"],
      maxlength: [500, "Post body must be less than 500 characters long"],
    },
    postImage: {
      type: String || null,
      default: null,
    },
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    // comments: [{ type: mongoose.Types.ObjectId, ref: Comment }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
