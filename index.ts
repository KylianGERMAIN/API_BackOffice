import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, login, resetPassword, refreshAccessToken } from './Routes/Auth';
import createArticle from './Routes/Articles/createArticle';

dotenv.config();

async function startServer() {

  const app = express();
  app.use(bodyParser.urlencoded())
  app.use(bodyParser.json())
  app.use(cors());

  app.use("/auth", register, login, resetPassword, refreshAccessToken)
  app.use("/articles", createArticle)

  app.listen(process.env.PORT, () => {
    console.log(`[API_BackOffice]: Server is running at http://localhost:${process.env.PORT}`);
  });

  app.get('/', (req: Request, res: Response) => {
    res.send("/");
  });

}

startServer();
