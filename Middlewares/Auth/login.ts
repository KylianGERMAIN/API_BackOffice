import express, { Express, Request, Response } from 'express';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import { pool } from '../../Function/Utils/database';
import { generateRefreshAcccesTokens } from '../../Function/Utils/generateToken';
import { rowIsVoid } from '../../Function/Utils/simpleCondition';
import { Users } from '../../Types/User';
const bcrypt = require('bcrypt');

export async function comparePassword(req: Request, res: Response, user: any) {
  bcrypt.compare(req.body.password, user.password, function (err: any, result: any) {
    if (result === false) {
      res.status(StatusCodes.FORBIDDEN).json({
        statusCode: StatusCodes.FORBIDDEN,
        message: "Badpassword"
      });
    }
    else {
      res.status(StatusCodes.OK).json(generateRefreshAcccesTokens(user));
    }
  })
}


export async function login(req: Request, res: Response) {
  await pool.query(`SELECT * FROM Public.users WHERE email like '${req.body.email}'`, (error: any, results: { rows: any; }) => {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
    else {
      if (rowIsVoid(results.rows) === true) {
        res.status(StatusCodes.FORBIDDEN).json({
          statusCode: StatusCodes.FORBIDDEN,
          message: ReasonPhrases.FORBIDDEN + ' User not found'
        });
      } else {
        comparePassword(req, res, results.rows[0])
      }
    }
  });
}
