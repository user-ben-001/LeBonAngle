import express from "express";
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../dao/messages.dao.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const conversations = await findAll();
    res.json(conversations);
  } catch (e) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const conversation = await findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation introuvable" });
    }
    return res.json(conversation);
  } catch (e) {
    return res.status(400).json({ error: "Id invalide" });
  }
});

export default router;
