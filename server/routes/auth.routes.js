import express from "express";
import {
  loginUser_controller,
  registerUser_controller,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser_controller);
router.post("/login", loginUser_controller);

export default router;
