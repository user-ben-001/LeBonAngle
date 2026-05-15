import {
  createPost_controller,
  getAllPost_controller,
  getPostByUser_controller,
  getPostById_controller,
  updatePost_controller,
  deletePost_controller,
  getPostByCategory_controller,
  getPostBySearch_controller,
} from "../controllers/annonces.controller.js";
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost_controller);

router.get("/", getAllPost_controller);
router.get("/user/:user_id", getPostByUser_controller);
router.get("/:id", getPostById_controller);
router.get("/search", getPostBySearch_controller);
router.get("/category/:categoryId", getPostByCategory_controller);

router.patch("/:id", authMiddleware, updatePost_controller);

router.delete("/:id", authMiddleware, deletePost_controller);

export default router;
