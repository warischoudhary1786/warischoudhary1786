import mongoose from "mongoose";
import { z } from "zod";
import { Post } from "../models/Post.js";

export const createPostSchema = z.object({
  content: z.string().trim().min(1).max(1000)
});

export async function createPost(req, res, next) {
  try {
    const post = await Post.create({
      author: req.userId,
      content: req.body.content
    });

    const populated = await post.populate("author", "name bio skills");
    return res.status(201).json({ post: populated });
  } catch (error) {
    return next(error);
  }
}

export async function getFeed(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name bio skills")
        .lean(),
      Post.countDocuments()
    ]);

    return res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function toggleLike(req, res, next) {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id." });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const userId = req.userId.toString();
    const liked = post.likes.some((id) => id.toString() === userId);

    if (liked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();

    return res.json({
      postId: post._id,
      liked: !liked,
      likesCount: post.likes.length
    });
  } catch (error) {
    return next(error);
  }
}
