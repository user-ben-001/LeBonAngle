import {
  createPost_model,
  getAllPost_model,
  getPostByUser_model,
  getPostById_model,
  updatePost_model,
  deletePost_model,
} from "../models/annonce.model.js";

export const createPost_controller = async (req, res) => {
  try {
    const { title, price, description, user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "Utilisateur manquant" });
    }
    const result = await createPost_model(title, price, description, user_id);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAllPost_controller = async (req, res) => {
  try {
    const result = await getAllPost_model();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getPostByUser_controller = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await getPostByUser_model(user_id);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getPostById_controller = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getPostById_model(id);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updatePost_controller = async (req, res) => {
  try {
    const id = req.params.id;
    const { description, picture } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Post introuvable" });
    }
    const result = await updatePost_model(description, picture, id);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deletePost_controller = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Annonce introuvalbe" });
    }
    const result = await deletePost_model(id);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
