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
    originalPost: {
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
    commentTotal: {
      type: Number,
      default: 0,
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    isRePost: {
      type: Boolean,
      immutable: true,
      default: true,
    },
  },
  { timestamps: true }
);

//TODO: figure out way to make it DRY

rePostSchema.post("findOneAndUpdate", async function (doc, next) {
  const update = JSON.parse(JSON.stringify(this.getUpdate()));

  if (Object.keys(update).includes("$push")) {
    doc.commentTotal += 1;
    await doc.save();
  } else if (Object.keys(update).includes("$pull")) {
    doc.commentTotal -= 1;
    await doc.save();
  }

  next();
});

export default mongoose.model("RePost", rePostSchema);
