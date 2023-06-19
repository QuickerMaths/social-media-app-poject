import User from "./Users";
import Comment from "./Comments";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: [true, "Post owner is required"],
    },
    ownerName: {
      type: String,
      required: [true, "Post owner is required"],
    },
    postBody: {
      type: String,
      required: [true, "Post body is required"],
      maxlength: [500, "Post body must be less than 500 characters long"],
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
