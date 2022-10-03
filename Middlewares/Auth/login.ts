import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { responseErrorDetectDb } from "../../Function/Response/responseDataBase";
import {
  responseBadPassword,
  responseErrorSearchingAccount,
  responseUserNotFound,
} from "../../Function/Response/responseUser";
import { pool } from "../../Function/Utils/database";
import { generateRefreshAcccesTokens } from "../../Function/Utils/generateToken";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";
import { User } from "../../Interfaces/User";
const bcrypt = require("bcrypt");

export async function comparePassword(req: Request, res: Response, user: any) {
  bcrypt.compare(
    req.body.password,
    user.password,
    function (err: any, result: any) {
      if (result === false) {
        responseBadPassword(res);
      } else {
        res.status(StatusCodes.OK).json(generateRefreshAcccesTokens(user));
      }
    }
  );
}

export async function login(req: Request, res: Response) {
  await pool.query(
    `SELECT * FROM Public.users WHERE email like '${req.body.email}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        responseErrorSearchingAccount(res);
      } else {
        if (rowIsVoid(results.rows) === true) {
          responseUserNotFound(res);
        } else {
          comparePassword(req, res, results.rows[0]);
        }
      }
    }
  );
}
