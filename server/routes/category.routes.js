import express from "express";
import { getAllCategories_controller } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategories_controller);

export default router;
