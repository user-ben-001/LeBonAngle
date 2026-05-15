import db from "../config/db.js";

export const getAllCategories_model = async () => {
  const [result] = await db.query("SELECT * FROM categories");
  return result;
};
