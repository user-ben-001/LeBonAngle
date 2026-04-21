import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  reaction: [{ type: String }],
});

const ConvSchema = new mongoose.Schema({
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
  return Conversation.find();
};

export const findById = (id) => {
  return Conversation.findOne({ _id: new ObjectId(id) });
};

export const createConv = async (post_id, id_1, id_2, message) => {
  await Conversation.create({
    post_id: post_id,
    participants: { id_1: id_1, id_2: id_2 },
    messages: [
      new Message({
        from: id_1,
        to: id_2,
        message: message,
      }),
    ],
  });
};

export const newMessage = async (id, id_1, id_2, message) => {
  const result = await Conversation.findByIdAndUpdate(
    id,
    {
      $push: {
        messages: new Message({ from: id_1, to: id_2, message: message }),
      },
    },
    { new: true },
  );
  return result;
};

export const update = async (id, data) => {
  await Conversation.updateOne({ _id: new ObjectId(id) }, { $set: data });
  return findById(id);
};

export const remove = async (id) => {
  const result = await Conversation.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};
