import { ValidationError } from "../error/NotFoundError.js";
import {
  createPost_model,
  getAllPost_model,
  getPostByUser_model,
  getPostById_model,
  updatePost_model,
  deletePost_model,
  getPostByCategory_model,
  getPostBySearch_model,
} from "../models/annonce.model.js";

export const createPost_controller = async (req, res, next) => {
  try {
    const { title, price, description, user_id, category_id } = req.body;
    if (!user_id) throw new ValidationError("utilisateur");
    const result = await createPost_model(
      title,
      price,
      description,
      user_id,
      category_id,
    );
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const getAllPost_controller = async (req, res, next) => {
  try {
    const result = await getAllPost_model();
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const getPostByUser_controller = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const result = await getPostByUser_model(user_id);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const getPostById_controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getPostById_model(id);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const getPostByCategory_controller = async (req, res, next) => {
  try {
    const category_id = req.params.categoryId;
    const result = await getPostByCategory_model(category_id);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const getPostBySearch_controller = async (req, res, next) => {
  try {
    const { q, category_id, min_price, max_price } = req.query;
    const result = await getPostBySearch_model(
      q,
      category_id,
      min_price,
      max_price,
    );
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const updatePost_controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { description, picture } = req.body;
    if (!id) throw new ValidationError("Id");
    const result = await updatePost_model(description, picture, id);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const deletePost_controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new ValidationError("Id");

    const result = await deletePost_model(id);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
