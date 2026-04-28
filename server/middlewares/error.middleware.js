export const errorMiddleware = async (err, req, res, next) => {
  if (err.status === 404) {
    return res
      .status(404)
      .json({ message: err.message || "Ressource introuvable" });
  }
//   console.error(err.stack);
  return res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Erreur serveur" });
};
