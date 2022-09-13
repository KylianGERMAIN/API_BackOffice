import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { pool } from "../../Function/Utils/database";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";
import { verifToken } from "../../Function/Utils/verifToken";
import { Article } from "../../Interfaces/Articles";

function checkArticleToDb(id: String, user_id: String, res: Response) {
  pool.query(
    `SELECT * FROM Public.articles WHERE id = '${id}' AND user_id = '${user_id}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: StatusCodes.INTERNAL_SERVER_ERROR + " an error was detected",
        });
      } else {
        if (rowIsVoid(results.rows) === true) {
          res.status(StatusCodes.FORBIDDEN).json({
            statusCode: StatusCodes.FORBIDDEN,
            message: ReasonPhrases.FORBIDDEN + " You can't delete this article",
          });
        } else {
          deleteArticleToDb(id, res);
        }
      }
    }
  );
}

function deleteArticleToDb(id: String, res: Response) {
  console.log(id);
  pool.query(
    `DELETE FROM public.articles WHERE "id" = '${id}'`,
    (error: any) => {
      if (error) {
        console.log(error);
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

export async function deleteArticle(req: Request, res: Response) {
  try {
    var token = JSON.parse(
      (await verifToken(req.headers.authorization, res)).toString()
    );
    console.log(req.body.id);
    if (token != "error") {
      checkArticleToDb(req.body.id, token.payload.id, res);
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      statusCode: StatusCodes.NOT_FOUND,
      message: StatusCodes.NOT_FOUND + "jwt not found",
    });
  }
}
