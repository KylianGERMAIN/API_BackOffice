import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {
  StatusCodes,
  ReasonPhrases,
} from 'http-status-codes';
import { verifToken } from '../../Function/Utils/verifToken';
import { pool } from '../../Function/Utils/database';
import { rowIsVoid } from '../../Function/Utils/simpleCondition';

const bcrypt = require('bcrypt');
dotenv.config();

function remplacePassword(password: string, token: any, res: Response) {
  pool.query(`UPDATE public.users SET password = '${password}' WHERE id = '${token.payload.id}'`, (error: any, results: { rows: any; }) => {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR + 'dd'
      });
    }
    else {
      res.status(StatusCodes.OK).json(({
        statusCode: StatusCodes.OK,
        message: ReasonPhrases.OK
      }));
    }
  })
}


function hashPassword(password: string, token: any, res: Response) {
  const saltRounds = 15;

  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR + ' error while generating the salt'
      });
      return
    }
    bcrypt.hash(password, salt, async function (err: any, hash: any) {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR + ' error while generating the salt'
        });
        return
      }
      remplacePassword(hash, token, res)
    });
  });
}

export async function resetPassword(req: Request, res: Response) {

  var token = JSON.parse((await verifToken(req.headers.authorization!.split(" "), res)).toString())
  if (token != 'error') {
    await pool.query(`SELECT * FROM Public.users WHERE id = '${token.payload.id}'`, (error: any, results: { rows: any; }) => {
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
          hashPassword(req.body.password, token, res)
        };
      }
    })
  }
}

