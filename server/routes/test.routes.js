import { testapi_controller } from "../controllers/test.controller.js";
import express from "express";

const router = express.Router();

router.get("/test", testapi_controller);

export default router;
