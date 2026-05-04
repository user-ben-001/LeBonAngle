import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { connect } from "./config/db-mongo.js";

import routesMessages from "./routes/messages.routes.js";
import routesAnnonces from "./routes/annonce.routes.js";
import routesAuth from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser())

app.use("/auth", routesAuth);
app.use("/messages", routesMessages);
app.use("/annonces", routesAnnonces);

app.use(errorMiddleware);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
