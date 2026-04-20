import mongoose from "mongoose";
import { getDb } from "../config/db-mongo.js";
import { ObjectId } from "mongodb";

const collection = () => getDb().collection("messages");

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
});

const ConvSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  post_id: { type: Number, required: true },
  participants: {
    id_1: { type: String, required: true },
    id_2: { type: String, required: true },
  },
  messages: [],
});

const Conversation = mongoose.model("Conversation", ConvSchema);
const Message = mongoose.model("Message", messageSchema);

export const findAll = () => {
  return collection().find();
};

export const findById = (id) => {
  return collection().findOne({ _id: new ObjectId(id) });
};

export const create = async (message) => {
  await Conversation.create({
    _id: new ObjectId(),
    post_id: 1,
    participants: { id_1: 1, id_2: 2 },
    messages:[new Message({
      from:1,
      to:2,
      message:"Bonjour"
    })]
  });
};

export const update = async (id, data) => {
  await collection().updateOne({ _id: new ObjectId(id) }, { $set: data });
  return findById(id);
};

export const remove = async (id) => {
  const result = await collection().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};
