import { Router } from "express";
import { createPost, createPostSchema, getFeed, toggleLike } from "../controllers/postController.js";
import { authRequired } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

router.get("/feed", authRequired, getFeed);
router.post("/", authRequired, validateBody(createPostSchema), createPost);
router.patch("/:postId/like", authRequired, toggleLike);

export default router;
