import db from "../config/db.js";

export const testapi_model = async () => {
  const [result] = await db.query("SELECT * FROM users");
  return result;
};
