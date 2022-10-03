import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { verifToken } from "../../Function/Utils/verifToken";
import { pool } from "../../Function/Utils/database";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";
import {
  responseErrorChangePassword,
  responseErrorSearchingAccount,
  responseErrorWhileGeneratingToken,
  responseErrorWhileHashingToken,
  responseUserNotFound,
} from "../../Function/Response/responseUser";
import { responseOK } from "../../Function/Response/responseOk";

const bcrypt = require("bcrypt");
dotenv.config();

function remplacePassword(password: string, token: any, res: Response) {
  pool.query(
    `UPDATE public.users SET password = '${password}' WHERE id = '${token.payload.id}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        responseErrorChangePassword(res);
      } else {
        responseOK(res);
      }
    }
  );
}

function hashPassword(password: string, token: any, res: Response) {
  const saltRounds = 15;

  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    if (err) {
      responseErrorWhileGeneratingToken(res);
      return;
    }
    bcrypt.hash(password, salt, async function (err: any, hash: any) {
      if (err) {
        responseErrorWhileHashingToken(res);
        return;
      }
      remplacePassword(hash, token, res);
    });
  });
}

export async function resetPassword(req: Request, res: Response) {
  var element = await verifToken(req.headers.authorization, res);
  var token = await JSON.parse(element);
  if (element != '{ "error": "error" }') {
    await pool.query(
      `SELECT * FROM Public.users WHERE id = '${token.payload.id}'`,
      (error: any, results: { rows: any }) => {
        if (error) {
          responseErrorSearchingAccount(res);
        } else {
          if (rowIsVoid(results.rows) === true) {
            responseUserNotFound(res);
          } else {
            hashPassword(req.body.password, token, res);
          }
        }
      }
    );
  }
}
