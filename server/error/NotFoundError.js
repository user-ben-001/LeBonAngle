import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(ressource = "Ressource") {
    super(`${ressource} introuvable`, 404);
  }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Non authorisé") {
    super(this.message, 401);
  }
}
export class ValidationError extends AppError {
  constructor(message = "Données invalide") {
    super(message, 400);
  }
}

