import { getAllCategories_model } from "../models/category.model.js";

export const getAllCategories_controller = async (req, res, next) => {
  try {
    const result = await getAllCategories_model();
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
