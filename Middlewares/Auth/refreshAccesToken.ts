import express, { Express, Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import { generateAccesToken } from '../../Function/Utils/generateToken';
import { verifToken } from '../../Function/Utils/verifToken';
const bcrypt = require('bcrypt');


export async function refreshAccesToken(req: Request, res: Response) {
  try {
    var token = JSON.parse((await verifToken(req.headers.authorization!.split(" "), res)).toString())
    if (token != 'error') {
      var user = {
        id: token.payload.id,
        email: token.payload.email
      }
      res.status(StatusCodes.CREATED).json(generateAccesToken(user));
    }
  }
  catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "jwt not found"
    });
  }
}
