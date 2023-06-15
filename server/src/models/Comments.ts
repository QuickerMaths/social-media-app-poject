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
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
