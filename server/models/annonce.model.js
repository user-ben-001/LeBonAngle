import db from "../config/db.js";

export const createPost_model = async (title, price, description, user_id) => {
  const result = await db.query(
    "INSERT INTO posts (title, price, description, user_id) VALUES (?,?,?,?) ",
    [title, price, description, user_id],
  );
  return result.instertId;
};
export const getAllPost_model = async () => {
  const [result] = await db.query("SELECT * FROM posts");
  return [result];
};
export const getPostByUser_model = async (user_id) => {
  const [result] = await db.query("SELECT * FROM posts WHERE user_id =?", [
    user_id,
  ]);
  return [result];
};
export const getPostById_model = async (id) => {
  const [result] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
  return [result];
};
export const updatePost_model = async (description, pictures, id) => {
  const result = await db.query(
    "UPDATE posts SET description = ?, pictures = ? WHERE id = ?",
    [description, pictures, id],
  );
  return result;
};
export const deletePost_model = async (id) => {
  const result = db.query("DELETE FROM posts WHERE id = ?", [id]);
  return result;
};
