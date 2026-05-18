import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(/[a-zA-Z0-9]/)
    .required(),
});

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required,
  password: Joi.string()
    .min(6)
    .pattern(/[a-zA-Z0-9]/)
    .required(),
});

export const newArticleSchema = Joi.object({
  title: Joi.string().max(255).required,
  price: Joi.number().integer().required,
  description: Joi.string(),
  user_id: Joi.number().integer().required(),
  category_id: Joi.number().integer().required(),
});
