import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: StatusCodes.INTERNAL_SERVER_ERROR + " an error was detected",
        });
      } else {
        res.status(StatusCodes.OK).json({
          statusCode: StatusCodes.OK,
          message: ReasonPhrases.OK,
        });
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
        res.status(StatusCodes.FORBIDDEN).json({
          statusCode: StatusCodes.FORBIDDEN,
          message: ReasonPhrases.FORBIDDEN + " Badpassword",
        });
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: StatusCodes.INTERNAL_SERVER_ERROR + " an error was detected",
        });
      } else {
        if (rowIsVoid(results.rows) === true) {
          res.status(StatusCodes.NOT_FOUND).json({
            statusCode: StatusCodes.NOT_FOUND,
            message: ReasonPhrases.NOT_FOUND + " User not found",
          });
        } else {
          comparePassword(req, res, results.rows[0]);
        }
      }
    }
  );
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    var token = JSON.parse(
      (await verifToken(req.headers.authorization, res)).toString()
    );
    if (token != "error") {
      if (token.payload.email != req.body.email) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          statusCode: StatusCodes.UNAUTHORIZED,
          message:
            StatusCodes.UNAUTHORIZED +
            " you are trying to delete an account that is not yours",
        });
      } else {
        checkMailToDb(req, res);
      }
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      statusCode: StatusCodes.NOT_FOUND,
      message: StatusCodes.NOT_FOUND + " jwt not found",
    });
  }
}
