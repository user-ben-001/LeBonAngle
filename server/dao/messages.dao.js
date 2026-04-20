import { getDb } from "../config/db-mongo.js";
import { ObjectId } from "mongodb";

const collection = () => getDb().collection("messages");

export const findAll = () => {
  return collection().find().toArray();
};

export const findById = (id) => {
  return collection().findOne({ _id: new ObjectId(id) });
};

export const create = async (message) => {
  const result = await collection().insertOne(message);
  return { _id: result.insertedId, ...message };
};

export const update = async (id, data) => {
  await collection().updateOne({ _id: new ObjectId(id) }, { $set: data });
  return findById(id);
};

export const remove = async (id) => {
  const result = await collection().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};
