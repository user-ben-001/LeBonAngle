import express from "express";
import {
  CreateConv_controller,
  findAll_controller,
  findById_controller,
  findMessageById_controller,
  newMessage_controller,
  newReaction_controller,
} from "../controllers/conv.controller.js";

const router = express.Router();

router.post("/", CreateConv_controller);

router.get("/", findAll_controller);
router.get("/:id", findById_controller);
router.get("/conv/:conv_id/message/:message_id", findMessageById_controller);

router.patch("/:id", newMessage_controller);
router.patch("/react/conv/:conv_id/message/:message_id", newReaction_controller);

export default router;
