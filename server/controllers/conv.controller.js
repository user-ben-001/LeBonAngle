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
import { AppError } from "../error/AppError.js";
import { NotFoundError, ValidationError } from "../error/NotFoundError.js";

export const CreateConv_controller = async (req, res, next) => {
  try {
    const { post_id, id_1, id_2, message } = req.body;
    if (!post_id) throw new NotFoundError("Annonce");
    if (!id_1 || !id_2 || !message)
      throw new ValidationError("information manquante");

    const result = await createConv(post_id, id_1, id_2, message);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const findAll_controller = async (req, res, next) => {
  try {
    const conversations = await findAll();
    return res.status(200).json(conversations);
  } catch (e) {
    next(error);
    throw new AppError(error.message, error.status);
  }
};
export const findById_controller = async (req, res) => {
  try {
    const conversation = await findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation introuvable" });
    }
    return res.json(conversation);
  } catch (error) {
    next(error);
  }
};
export const findMessageById_controller = async (req, res, next) => {
  try {
    const conv_id = req.params.conv_id;
    const message_id = req.params.message_id;
    const result = await findMessageById(conv_id, message_id);
    return res.status(200).json({ result: result });
  } catch (error) {
    next(error);
  }
};

export const newMessage_controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { id_1, id_2, message } = req.body;

    const exist = findById(id);

    if (!exist) {
      return res.status(400).json({ message: "Conversation introuvable" });
    }
    if (!id_1 || !id_2) {
      throw new ValidationError("Ids");
    }

    const result = await newMessage(id, id_1, id_2, message);

    return res.status(200).json({ result: result, id: id });
  } catch (error) {
    next(error);
  }
};
export const newReaction_controller = async (req, res, next) => {
  try {
    const conv_id = req.params.conv_id;
    const message_id = req.params.message_id;
    const { user_id, emoji } = req.body;

    // const exist = await findMessageById(conv_id, message_id);
    // if (!exist) {
    //   throw new ValidationError("Message");
    // }
    // console.log(exist);

    const result = await newReaction(conv_id, message_id, user_id, emoji);

    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
