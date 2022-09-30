import { json } from "body-parser";
import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResponseErrorCantDeleteArticle } from "../../Function/Response/responseArticle";
import { responseErrorDetectDb } from "../../Function/Response/responseDataBase";
import { responseOK } from "../../Function/Response/responseOk";
import {
  responseBadPassword,
  responseDeleteNotYourAccount,
  responseUserNotFound,
} from "../../Function/Response/responseUser";
import { pool } from "../../Function/Utils/database";
import { generateRefreshAcccesTokens } from "../../Function/Utils/generateToken";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";
import { verifToken } from "../../Function/Utils/verifToken";
const bcrypt = require("bcrypt");

export async function deleteAccountToDb(req: Request, res: Response) {
  await pool.query(
    `DELETE FROM public.users WHERE "email" = '${req.body.email}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        ResponseErrorCantDeleteArticle(res);
      } else {
        responseOK(res);
      }
    }
  );
}

export async function comparePassword(req: Request, res: Response, user: any) {
  bcrypt.compare(
    req.body.password,
    user.password,
    function (err: any, result: any) {
      if (result === false) {
        responseBadPassword(res);
      } else {
        deleteAccountToDb(req, res);
      }
    }
  );
}

export async function checkMailToDb(req: Request, res: Response) {
  await pool.query(
    `SELECT * FROM Public.users WHERE email like '${req.body.email}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        responseErrorDetectDb(res);
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

export async function deleteAccount(req: Request, res: Response) {
  var element = await verifToken(req.headers.authorization, res);
  var token = await JSON.parse(element);
  if (element != '{ "error": "error" }') {
    if (token.payload.email != req.body.email) {
      responseDeleteNotYourAccount(res);
    } else {
      checkMailToDb(req, res);
    }
  }
}
