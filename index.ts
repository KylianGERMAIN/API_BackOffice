import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register } from './Routes/Auth';

dotenv.config();

async function startServer() {

  const app = express();
  app.use(bodyParser.urlencoded())
  app.use(bodyParser.json())
  app.use(cors());

  app.use("/auth", register)

  app.listen(process.env.PORT, () => {
    console.log(`[API_BackOffice]: Server is running at http://localhost:${process.env.PORT}`);
  });

  app.get('/', (req: Request, res: Response) => {
    res.send("/");
  });

  // app.post('/api/decode', (req: Request, res: Response) => {
  //   const bcrypt = require('bcrypt');
  //   bcrypt.compare(req.body.actualpassword, req.body.passwordcrypt, function (err: any, result: any) {
  //     res.send("Compared result " + result)
  //   })
  // })

}

startServer();
