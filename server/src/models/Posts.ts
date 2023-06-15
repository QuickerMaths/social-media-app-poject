import User from "./Users";
import Comment from "./Comments";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: User, required: true },
    postBody: {
      type: String,
      required: true,
    },
    //TODO: Check if this is the correct way to reference a image
    imageUrl: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    // comments: [{ type: mongoose.Types.ObjectId, ref: Comment }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
