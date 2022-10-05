import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import {
  register,
  login,
  resetPassword,
  refreshAccessToken,
} from "./Routes/Auth";
import createArticle from "./Routes/Articles/createArticle";
import deleteArticle from "./Routes/Articles/deleteArticle";
import deleteAccount from "./Routes/Auth/deleteAccount";
import getArticles from "./Routes/Articles/getArticles";
import updateArticle from "./Routes/Articles/updateArticle";

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  "/auth",
  register,
  login,
  resetPassword,
  refreshAccessToken,
  deleteAccount
);
app.use("/articles", createArticle, deleteArticle, getArticles, updateArticle);

export default app;
