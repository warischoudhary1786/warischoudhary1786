import { Router } from "express";
import { login, loginSchema, me, register, registerSchema } from "../controllers/authController.js";
import { authRequired } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/me", authRequired, me);

export default router;
