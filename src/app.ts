import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import * as nunjucks from "nunjucks";

import api from "./api";
import * as middlewares from "./middlewares";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

nunjucks.configure("public", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

app.use(express.static("assets"));
app.get("/", (req, res) => {
  res.render("home.njk");
});
app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
