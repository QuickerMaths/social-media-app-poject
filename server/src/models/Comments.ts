import User from "./Users";
import Post from "./Posts";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: Post, required: true },
    user: { type: mongoose.Types.ObjectId, ref: User, required: true },
    commentBody: {
      type: String,
      required: [true, "Comment body is required"],
      maxlength: [500, "Comment body must be less than 500 characters long"],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
