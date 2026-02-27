import { z } from "zod";
import { User } from "../models/User.js";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  bio: z.string().max(280).optional().default(""),
  skills: z.array(z.string().trim().min(1).max(40)).max(30).optional().default([])
});

export async function getMyProfile(req, res, next) {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ profile: user });
  } catch (error) {
    return next(error);
  }
}

export async function updateMyProfile(req, res, next) {
  try {
    const { name, bio, skills } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, skills },
      { new: true, runValidators: true, select: "-passwordHash" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ profile: user });
  } catch (error) {
    return next(error);
  }
}

export async function getProfileById(req, res, next) {
  try {
    const user = await User.findById(req.params.userId).select("name bio skills createdAt updatedAt");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ profile: user });
  } catch (error) {
    return next(error);
  }
}
