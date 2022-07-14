import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {
  StatusCodes,
  ReasonPhrases,
} from 'http-status-codes';

const jwt = require('jsonwebtoken');
dotenv.config();

export async function verifToken(token: string[], res: Response): Promise<string> {
  try {
    if (token[0] != 'Bearer')
      throw ({ message: 'jwt invalid' });
    else {
      jwt.verify(token[1], process.env.TOKEN_SECRET);
      const decodedToken = jwt.decode(token[1], {
        complete: true
      });
      return JSON.stringify(decodedToken)
    }
  }
  catch (e: any) {
    console.log(e.message)
    if (e.message === 'jwt expired') {
      res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "jwt expired"
      });
      return 'error'
    }
    else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "jwt invalid"
      });
      return 'error'
    }
  }
}