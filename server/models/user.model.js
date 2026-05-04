import db from "../config/db.js";

export const createUser_model = async (username, email, pass) => {
  const result = await db.query(
    "INSERT INTO users (username,email,pass_hash) VALUES (?,?,?)",
    [username, email, pass],
  );
  return result.insertId;
};

export const findUserByEmail_model = async (email) => {
  const [result] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return result[0];
};

export const findUserById_model = async (id) => {
  const [result] = await db.query("SELECT * FROM users WHERE id =?", [id]);
  return result[0];
};
