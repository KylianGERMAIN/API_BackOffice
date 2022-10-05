import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  responseArticleNotFound,
  ResponseErrorSearchingArticle,
  responseErrorUpdateArticle,
} from "../../Function/Response/responseArticle";
import { responseOK } from "../../Function/Response/responseOk";
import { pool } from "../../Function/Utils/database";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";
import { verifToken } from "../../Function/Utils/verifToken";
import { Article } from "../../Interfaces/Articles";

function remplaceArticle(article: Article, res: Response) {
  pool.query(
    `UPDATE public.articles SET title = '${article.title}', content = '${article.content}', date = '${article.date}' WHERE id = '${article.id}'`,
    (error: any, results: { rows: any }) => {
      if (error) {
        responseErrorUpdateArticle(res);
      } else {
        responseOK(res);
      }
    }
  );
}

export async function updateArticles(req: Request, res: Response) {
  var element = await verifToken(req.headers.authorization, res);
  var token = await JSON.parse(element);
  if (element != '{ "error": "error" }') {
    const article: Article = {
      id: req.body.id,
      user_id: token.payload.id,
      title: req.body.title,
      content: req.body.content,
      date: Date.now().toString(),
    };
    await pool.query(
      `SELECT * FROM Public.articles WHERE id = '${req.body.id}'`,
      (error: any, results: { rows: any }) => {
        if (error) {
          ResponseErrorSearchingArticle(res);
        } else {
          if (rowIsVoid(results.rows) === true) {
            responseArticleNotFound(res);
          } else {
            remplaceArticle(article, res);
          }
        }
      }
    );
  }
}
