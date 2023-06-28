import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const postSchema = new Schema(
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
    //TODO: add max and min size of images and style it on frontend to make fully responsive
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
    commentTotal: {
      type: Number,
      default: 0,
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

postSchema.post("findOneAndUpdate", async function (doc, next) {
  doc.commentTotal += 1;
  await doc.save();
  next();
});

export default mongoose.model("Post", postSchema);
