import "dotenv/config";
import express from "express";
import cors from "cors";

import { connect } from "./config/db-mongo.js";

import routesTest from "./routes/test.routes.js";
import routesMessages from "./routes/messages.routes.js";
import routesAnnonces from "./routes/annonce.routes.js";
import routesAuth from "./routes/auth.routes.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "",
    credentials: true,
  }),
);

app.use("/api", routesTest);
app.use("/auth", routesAuth);
app.use("/messages", routesMessages);
app.use("/annonces", routesAnnonces);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
