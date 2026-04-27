import mongoose from "mongoose";

let db;

export const connect = async () => {
  db = await mongoose.connect(process.env.MONGO_URI);
  console.log("Connecté à MongoDB");
};

export const getDb = () => {
  return db;
};
