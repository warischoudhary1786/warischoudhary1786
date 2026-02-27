import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: []
    }
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1 });

export const Post = mongoose.model("Post", postSchema);
