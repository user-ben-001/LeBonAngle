import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb://localhost:27017",
);
let db;

export const connect = async () => {
  await client.connect();
  db = client.db("leBonAngle");
  console.log("Connecté à MongoDB");
};

export const getDb = () => {
  return db;
};
