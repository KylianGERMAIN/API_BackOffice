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

function addUserToDb(user: Users, res: Response) {
  pool.query(`INSERT INTO public.users("id", "email", "password", "date") VALUES('${user.uid}', '${user.email}', '${user.password}', '${user.date}}')`,
    (error: any) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR + ' an error was detected when adding the user to the database'
        });
        return false;
      }
      return true;
    })
  return true
}

function hashPassword(user: Users, res: Response) {
  const saltRounds = 15;

  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR + ' error while generating the salt'
      });
      return
    }
    bcrypt.hash(user.password, salt, async function (err: any, hash: any) {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR + ' error while generating the salt'
        });
        return
      }
      user.password = hash
      if (await addUserToDb(user, res) === true) {
        res.status(StatusCodes.CREATED).json(generateRefreshAcccesTokens(user));
      }
    });
  });
}

export async function register(req: Request, res: Response) {
  var uuid = require('uuid');
  const user: Users = {
    uid: uuid.v4(),
    email: req.body.email,
    password: req.body.password,
    date: Date.now().toString()
  }
  await pool.query(`SELECT * FROM Public.users WHERE email like '${user.email}'`, (error: any, results: { rows: any; }) => {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      });
    }
    else {
      if (rowIsVoid(results.rows) === true) {
        hashPassword(user, res)
      } else {
        res.status(StatusCodes.FORBIDDEN).json({
          statusCode: StatusCodes.FORBIDDEN,
          message: ReasonPhrases.FORBIDDEN + ' Your email already exists'
        });
      }
    }
  });
}
