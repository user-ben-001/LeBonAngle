import "dotenv/config";
import {
  createUser_model,
  findUserByEmail_model,
} from "../models/user.model.js";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../error/NotFoundError.js";
import { AppError } from "../error/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser_controller = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new ValidationError();

    const existing = await findUserByEmail_model(email);
    if (existing) throw new UnauthorizedError();

    const saltRound = await bcrypt.genSalt(10);
    const pass_hashed = await bcrypt.hash(password, saltRound);

    await createUser_model(username, email, pass_hashed);
    return res.status(201).json({ message: "Compte créer avec succès" });
  } catch (error) {
    throw new AppError(error.status, error.message);
  }
};

export const loginUser_controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new ValidationError();

    const user = await findUserByEmail_model(email);
    if (!user) {
      throw new NotFoundError("User");
    }

    const valid = await bcrypt.compare(
      password,
      user.pass_hash,
      (err, results) => {
        if (!results) {
          throw new ValidationError();
        }

        const key = process.env.SECRET_KEY;
        const token = jwt.sign({ name: user.username, id: user.id }, key, {
          expiresIn: "5min",
        });
        return res.status(200).json({ token });
      },
    );
  } catch (error) {
    throw new AppError(error.status, error.message);
  }
};
