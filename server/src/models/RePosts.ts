import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const rePostSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Post owner is required"],
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("RePost", rePostSchema);
