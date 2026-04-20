import {
  createPost_controller,
  getAllPost_controller,
  getPostByUser_controller,
  getPostById_controller,
  updatePost_controller,
  deletePost_controller,
} from "../controllers/annonces.controller.js";
import express from "express";

const router = express.Router();

router.post("/", createPost_controller);

router.get("/", getAllPost_controller);
router.get("/user/:user_id", getPostByUser_controller);
router.get("/:id", getPostById_controller);

router.patch("/:id", updatePost_controller);

router.delete("/:id", deletePost_controller);

export default router;
