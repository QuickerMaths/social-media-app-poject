import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    commentBody: {
      type: String,
      required: [true, "Comment body is required"],
      maxlength: [500, "Comment body must be less than 500 characters long"],
    },
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: [true, "Post id is required"],
    },
    belongsToRePost: {
      type: Boolean,
      required: [true, "BelongsToRePost is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
