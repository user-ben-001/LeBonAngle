import "dotenv/config";
import {
  createUser_model,
  findUserByEmail_model,
  findUserById_model,
} from "../models/user.model.js";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../error/NotFoundError.js";
import { AppError } from "../error/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 1000 * 60 * 60 * 24,
};

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

        const jwtKey = process.env.SECRET_KEY;
        const accessToken = jwt.sign(
          { name: user.username, id: user.id },
          jwtKey,
          {
            expiresIn: "5min",
          },
        );
        const cookieKey = process.env.COOKIE_KEY;
        const refreshToken = jwt.sign(
          { name: user.username, id: user.id },
          cookieKey,
          {
            expiresIn: "24h",
          },
        );

        res.cookie("refreshToken", refreshToken, COOKIE_OPTS);
        return res.status(200).json({ accessToken });
      },
    );
  } catch (error) {
    throw new AppError(error.status, error.message);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshTokenOld = req.cookie.refreshToken;
    if (!refreshTokenOld) {
      throw new UnauthorizedError("refresh token manquant");
    }
    try {
      let payload = jwt.verify(refreshTokenOld, process.env.COOKIE_KEY);
    } catch {
      throw new UnauthorizedError("Refresh token invalide ou expiré");
    }
    const user = await findUserById_model(payload.id);

    const jwtKey = process.env.SECRET_KEY;
    const accessToken = jwt.sign({ name: user.username, id: user.id }, jwtKey, {
      expiresIn: "5min",
    });
    const cookieKey = process.env.COOKIE_KEY;
    const refreshToken = jwt.sign(
      { name: user.username, id: user.id },
      cookieKey,
      {
        expiresIn: "24h",
      },
    );

    res.cookie("refreshToken", refreshToken, COOKIE_OPTS);
    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
