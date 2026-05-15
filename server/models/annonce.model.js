import db from "../config/db.js";

export const createPost_model = async (
  title,
  price,
  description,
  user_id,
  category_id,
) => {
  const result = await db.query(
    "INSERT INTO posts (title, price, description, user_id, category_id) VALUES (?,?,?,?,?) ",
    [title, price, description, user_id, category_id],
  );
  return result.instertId;
};

export const getAllPost_model = async () => {
  const [result] = await db.query("SELECT * FROM posts");
  return [result];
};
export const getPostByCategory_model = async (categoryId) => {
  const [result] = await db.query("SELECT * FROM posts WHERE category_id =?", [
    categoryId,
  ]);
  return result;
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
export const getPostBySearch_model = async ({
  q,
  categoryId,
  minPrice,
  maxPrice,
}) => {
  let sql = "SELECT * FROM posts WHERE 1=1 ";
  const params = [];

  if (q != undefined) {
    sql += "AND (title LIKE ? OR description LIKE ?) ";
    params.push(`%${q}%`, `%${q}%`);
  }

  if (categoryId) {
    sql += "AND category_id=? ";
    params.push(Number(categoryId));
  }

  if (minPrice) {
    sql += "AND price >=? ";
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    sql += "AND price <=? ";
    params.push(Number(maxPrice));
  }

  const [rows] = await db.query(sql, params);
  return rows;
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
