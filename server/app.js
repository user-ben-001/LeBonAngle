import "dotenv/config";
import express from "express";
import cors from "cors";

import routesTest from "./routes/test.routes.js";

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
