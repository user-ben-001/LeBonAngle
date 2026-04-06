import "dotenv/config";
import path from "path";
import fs from "fs";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

try {
  await db.getConnection();
  console.log("Connecté à la BDD");
} catch (error) {
  console.log("Erreur de connexion à la BDD ", error.message);
  process.exit(1);
}

export default db;
