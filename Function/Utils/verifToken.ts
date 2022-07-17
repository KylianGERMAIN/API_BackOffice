import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {
  StatusCodes,
} from 'http-status-codes';

const jwt = require('jsonwebtoken');
dotenv.config();

export async function verifToken(authorization: any, res: Response): Promise<string> {
  try {
    var token = authorization.split(" ")
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
  catch (error: any) {
    if (error.message === 'jwt expired') {
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