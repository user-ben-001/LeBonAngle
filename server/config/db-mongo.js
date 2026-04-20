import mongoose from "mongoose";

let db;

export const connect = async () => {
  db = await mongoose.connect("mongodb://localhost:27017/leBonAngle");
  console.log("Connecté à MongoDB");
};

export const getDb = () => {
  return db;
};
