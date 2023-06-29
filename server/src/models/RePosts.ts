import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const rePostSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Post owner is required"],
    },
    postBody: {
      type: String,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("RePost", rePostSchema);