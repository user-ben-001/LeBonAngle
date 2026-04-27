import {
  findAll,
  findById,
  createConv,
  newMessage,
  newReaction,
  update,
  remove,
  findMessageById,
} from "../dao/messages.dao.js";

export const CreateConv_controller = async (req, res) => {
  try {
    const { post_id, id_1, id_2, message } = req.body;
    const result = await createConv(post_id, id_1, id_2, message);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const findAll_controller = async (req, res) => {
  try {
    const conversations = await findAll();
    return res.status(200).json(conversations);
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
export const findById_controller = async (req, res) => {
  try {
    const conversation = await findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation introuvable" });
    }
    return res.json(conversation);
  } catch (e) {
    return res.status(400).json({ error: "Id invalide" });
  }
};
export const findMessageById_controller = async (req, res) => {
  try {
    const conv_id = req.params.conv_id;
    const message_id = req.params.message_id;
    const result = await findMessageById(conv_id, message_id);
    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const newMessage_controller = async (req, res) => {
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
};
export const newReaction_controller = async (req, res) => {
  try {
    const conv_id = req.params.id;
    const { message_id, user_id, emoji } = req.body;

    const exist = await findMessageById(conv_id, message_id);
    if (!exist) {
      return res.status(400).json({ message: "Message introuvable" });
    }

    const result = await newReaction(conv_id, message_id, user_id, emoji);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
