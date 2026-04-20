import express from "express";
import {
  findAll,
  findById,
  createConv,
  newMessage,
  update,
  remove,
} from "../dao/messages.dao.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { post_id, id_1, id_2, message } = req.body;
    const result = await createConv(post_id, id_1, id_2, message);
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ e });
  }
});

router.get("/", async (req, res) => {
  try {
    const conversations = await findAll();
    return res.status(200).json(conversations);
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur" });
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

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { id_1, id_2, message } = req.body;

    const exist = findById(id);

    if (!exist) {
      return res.status(400).json({ message: "Conversation introuvable" });
    }
    if (!id_1 || !id_2) {
      return res
        .status(400)
        .json({ message: "L'un des destinataire est introuvable" });
    }

    const result = await newMessage(id, id_1, id_2, message);

    return res.status(200).json({ result: result, id: id });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
