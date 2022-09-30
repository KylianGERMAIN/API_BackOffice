import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { responseErrorDetectDb } from "../../Function/Response/responseDataBase";
import { pool } from "../../Function/Utils/database";
import { verifToken } from "../../Function/Utils/verifToken";
import { Article } from "../../Interfaces/Articles";

function addArticleToDb(article: Article, res: Response) {
  pool.query(
    `INSERT INTO public.articles("id", "user_id", "title", "content", "date") VALUES('${article.uid}', '${article.user_id}', '${article.title}', '${article.content}', '${article.date}')`,
    (error: any) => {
      if (error) {
        responseErrorDetectDb(res);
      } else {
        res.status(StatusCodes.OK).json({
          statusCode: StatusCodes.OK,
          message: ReasonPhrases.OK,
          id: article.uid,
        });
      }
    }
  );
}

export async function createArticle(req: Request, res: Response) {
  var uuid = require("uuid");
  var element = await verifToken(req.headers.authorization, res);
  var token = await JSON.parse(element);
  if (element != '{ "error": "error" }') {
    const article: Article = {
      uid: uuid.v4(),
      user_id: token.payload.id,
      title: req.body.title,
      content: req.body.content,
      date: Date.now().toString(),
    };
    addArticleToDb(article, res);
  }
}
