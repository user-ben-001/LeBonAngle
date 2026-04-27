import { ObjectId } from "mongodb";
import { Conversation } from "../schema/conv.schema.js";

export const findAll = async () => {
  return await Conversation.find();
};

export const findById = async (id) => {
  return await Conversation.findOne({ _id: id });
};

export const findMessageById = async (conv_id, message_id) => {
  return await Conversation.findOne(
    {
      _id: conv_id,
      "messages._id": message_id,
    },
    { "messages.$": 1 },
  );
};

export const createConv = async (post_id, id_1, id_2, message) => {
  await Conversation.create({
    post_id: post_id,
    participants: { id_1: id_1, id_2: id_2 },
    messages: [
      {
        from: id_1,
        to: id_2,
        message: message,
      },
    ],
  });
};

export const newMessage = async (id, id_1, id_2, message) => {
  const result = await Conversation.findByIdAndUpdate(
    id,
    {
      $push: {
        messages: { from: id_1, to: id_2, message: message },
      },
    },
    { returnDocument: "after" },
  );
  return result;
};

export const newReaction = async (conv_id, message_id, user_id, emoji) => {
  const result = await Conversation.findByIdAndUpdate(
    {
      _id: conv_id,
      "messages_id": message_id,
    },
    {
      $push: {
        "messages.$.reactions": {
          user_id: user_id,
          emoji: emoji,
        },
      },
    },
    { returnDocument: "after" },
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
