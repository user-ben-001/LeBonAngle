import express from "express";
import {
  loginUser_controller,
  logout_controller,
  refresh,
  registerUser_controller,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser_controller);
router.post("/login", loginUser_controller);
router.post("/refresh", refresh);
router.post("/logout", logout_controller);

export default router;
