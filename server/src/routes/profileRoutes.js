import { Router } from "express";
import {
  getMyProfile,
  getProfileById,
  updateMyProfile,
  updateProfileSchema
} from "../controllers/profileController.js";
import { authRequired } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

router.get("/me", authRequired, getMyProfile);
router.put("/me", authRequired, validateBody(updateProfileSchema), updateMyProfile);
router.get("/:userId", authRequired, getProfileById);

export default router;
