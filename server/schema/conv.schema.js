import mongoose, { Schema } from "mongoose";

const reactionSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  emoji: { type: String, required: true },
});

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  reactions: { type: [reactionSchema], default: [] },
});

const ConvSchema = new mongoose.Schema({
  post_id: { type: Number, required: true },
  participants: {
    id_1: { type: String, required: true },
    id_2: { type: String, required: true },
  },
  messages: { type: [messageSchema], default: [] },
});

export const Conversation = mongoose.model("Conversation", ConvSchema);
