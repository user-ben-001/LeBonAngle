import express from "express";
import {
  loginUser_controller,
  logout_controller,
  refresh,
  registerUser_controller,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middlware.js";
import { loginSchema, registerSchema } from "../schema/validation.schema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser_controller);
router.post("/login", validate(loginSchema), loginUser_controller);
router.post("/refresh", refresh);
router.post("/logout", logout_controller);

export default router;
