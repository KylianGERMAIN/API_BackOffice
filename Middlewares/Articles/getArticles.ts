import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { pool } from "../../Function/Utils/database";
import { verifToken } from "../../Function/Utils/verifToken";

export async function getArticlesToDb(req: Request, res: Response, id: string) {
  await pool.query(
    `SELECT * FROM Public.articles WHERE "user_id" = '${id}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: StatusCodes.INTERNAL_SERVER_ERROR + error,
        });
      } else {
        for (var i = 0; i != results.rows.length; i++)
          delete results.rows[i].user_id;
        res.status(StatusCodes.OK).json({
          meta: {},
          data: results.rows,
        });
      }
    }
  );
}

export async function getArticles(req: Request, res: Response) {
  var token = JSON.parse(
    (await verifToken(req.headers.authorization, res)).toString()
  );
  if (token != "error") {
    getArticlesToDb(req, res, token.payload.id);
  }
}
