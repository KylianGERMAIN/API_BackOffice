import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { pool } from "../../Function/Utils/database";
import { verifToken } from "../../Function/Utils/verifToken";
import { Article } from "../../Interfaces/Articles";

function addArticleToDb(article: Article, res: Response) {
  console.log(article);
  pool.query(
    `INSERT INTO public.articles("id", "user_id", "title", "content", "date") VALUES('${article.uid}', '${article.user_id}', '${article.title}', '${article.content}', '${article.date}}')`,
    (error: any) => {
      if (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message:
            StatusCodes.INTERNAL_SERVER_ERROR +
            " an error was detected when creating the article to the database",
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

export async function createArticle(req: Request, res: Response) {
  var uuid = require("uuid");

  var token = JSON.parse(
    (await verifToken(req.headers.authorization, res)).toString()
  );
  if (token != "error") {
    console.log(token);
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
