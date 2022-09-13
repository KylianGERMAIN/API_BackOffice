import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { verifToken } from "../../Function/Utils/verifToken";
import { pool } from "../../Function/Utils/database";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";

const bcrypt = require("bcrypt");
dotenv.config();

function remplacePassword(password: string, token: any, res: Response) {
  pool.query(
    `UPDATE public.users SET password = '${password}' WHERE id = '${token.payload.id}'`,
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

function hashPassword(password: string, token: any, res: Response) {
  const saltRounds = 15;

  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message:
          StatusCodes.INTERNAL_SERVER_ERROR +
          " error while generating the salt",
      });
      return;
    }
    bcrypt.hash(password, salt, async function (err: any, hash: any) {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message:
            StatusCodes.INTERNAL_SERVER_ERROR +
            " error while generating the salt",
        });
        return;
      }
      remplacePassword(hash, token, res);
    });
  });
}

export async function resetPassword(req: Request, res: Response) {
  try {
    var token = JSON.parse(
      (await verifToken(req.headers.authorization, res)).toString()
    );
    if (token != "error") {
      await pool.query(
        `SELECT * FROM Public.users WHERE id = '${token.payload.id}'`,
        (error: any, results: { rows: any }) => {
          if (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
              message:
                StatusCodes.INTERNAL_SERVER_ERROR + " an error was detected",
            });
          } else {
            if (rowIsVoid(results.rows) === true) {
              res.status(StatusCodes.NOT_FOUND).json({
                statusCode: StatusCodes.NOT_FOUND,
                message: ReasonPhrases.NOT_FOUND + " User not found",
              });
            } else {
              hashPassword(req.body.password, token, res);
            }
          }
        }
      );
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      statusCode: StatusCodes.NOT_FOUND,
      message: StatusCodes.NOT_FOUND + "jwt not found",
    });
  }
}
