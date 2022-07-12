import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { register } from './routes/register';
import cors from 'cors';

dotenv.config();

async function startServer() {

  const { Pool } = require("pg");
  const app = express();

  const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.NAME_DB,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
    ssl: true
  });

  app.use(bodyParser.urlencoded())
  app.use(bodyParser.json())
  app.use(cors());

  app.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
  });

  app.get('/', (req: Request, res: Response) => {
    res.send("/");
  });

  app.post('/api/createNewUser', (req: Request, res: Response) => {
    register(req, res, pool)
  })

  app.post('/api/decode', (req: Request, res: Response) => {
    const bcrypt = require('bcrypt');
    bcrypt.compare(req.body.actualpassword, req.body.passwordcrypt, function (err: any, result: any) {
      res.send("Compared result " + result)
    })
  })

}

startServer();
