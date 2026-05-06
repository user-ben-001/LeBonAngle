import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error/NotFoundError.jsx";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("Token manquant");
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch {
    next(new UnauthorizedError("Token invalide"));
  }
};
