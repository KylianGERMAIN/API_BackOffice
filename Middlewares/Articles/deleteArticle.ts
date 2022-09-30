import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResponseErrorCantDeleteArticle } from "../../Function/Response/responseArticle";
import { responseErrorDetectDb } from "../../Function/Response/responseDataBase";
import { responseOK } from "../../Function/Response/responseOk";
import { pool } from "../../Function/Utils/database";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";
import { verifToken } from "../../Function/Utils/verifToken";
import { Article } from "../../Interfaces/Articles";

function checkArticleToDb(id: String, user_id: String, res: Response) {
  pool.query(
    `SELECT * FROM Public.articles WHERE id = '${id}' AND user_id = '${user_id}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        responseErrorDetectDb(res);
      } else {
        if (rowIsVoid(results.rows) === true) {
          ResponseErrorCantDeleteArticle(res);
        } else {
          deleteArticleToDb(id, res);
        }
      }
    }
  );
}

function deleteArticleToDb(id: String, res: Response) {
  pool.query(
    `DELETE FROM public.articles WHERE "id" = '${id}'`,
    (error: any) => {
      if (error) {
        responseErrorDetectDb(res);
      } else {
        responseOK(res);
      }
    }
  );
}

export async function deleteArticle(req: Request, res: Response) {
  var element = await verifToken(req.headers.authorization, res);
  var token = await JSON.parse(element);
  if (element != '{ "error": "error" }') {
    checkArticleToDb(req.body.id, token.payload.id, res);
  }

}
