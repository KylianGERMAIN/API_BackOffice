import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  responseErrorCountArticle,
  responseErrorPagination,
} from "../../Function/Response/responseArticle";
import { pool } from "../../Function/Utils/database";
import { verifToken } from "../../Function/Utils/verifToken";

export async function getArticlesToDb(req: Request, res: Response, id: string) {
  var actualSql = "";

  if (req.query.pagination != undefined) {
    if (
      isNaN(Number(req.query.pagination.toString())) ||
      Number(req.query.pagination.toString()) < 1
    ) {
      responseErrorPagination(res);
      return;
    }
    var pagination = 10 * Number(req.query.pagination) - 10;
    actualSql = `SELECT * FROM public.articles order by "date" limit  10 OFFSET ${pagination};`;
  } else {
    actualSql = `SELECT * FROM public.articles order by "date" limit  10 OFFSET 0;`;
  }

  await pool.query(
    `select count(*) from public.articles where "user_id" = '${id}'`,
    async (er: any, resu: any) => {
      await pool.query(actualSql, (error: any, results: { rows: any }) => {
        if (error) {
          responseErrorCountArticle(res);
        } else {
          for (var i = 0; i != results.rows.length; i++)
            delete results.rows[i].user_id;
          res.status(StatusCodes.OK).json({
            data: results.rows,
            meta: {
              pagination: {
                page:
                  req.query.pagination == undefined
                    ? 1
                    : Number(req.query.pagination),
                pageSize: 10,
                pageCount: Math.ceil(resu.rows[0].count / 10),
                total: Number(resu.rows[0].count),
              },
            },
          });
        }
      });
    }
  );
}

export async function getArticlesToDbWithSearch(
  req: Request,
  res: Response,
  id: string
) {
  var actualSql = "";

  if (req.query.pagination != undefined) {
    if (
      isNaN(Number(req.query.pagination.toString())) ||
      Number(req.query.pagination.toString()) < 1
    ) {
      responseErrorPagination(res);
      return;
    }
    var pagination = 10 * Number(req.query.pagination) - 10;
    actualSql = `SELECT * FROM Public.articles WHERE title ILIKE '%${req.query.search}%' AND "user_id" = '${id}' order by "date" limit 10 OFFSET ${pagination};`;
  } else {
    actualSql = `SELECT * FROM Public.articles WHERE title ILIKE '%${req.query.search}%' AND "user_id" = '${id}' order by "date" limit 10 OFFSET 0`;
  }
  await pool.query(
    `select count(*) from public.articles  WHERE title ILIKE '%${req.query.search}%' AND "user_id" = '${id}'`,
    async (er: any, resu: any) => {
      await pool.query(actualSql, (error: any, results: { rows: any }) => {
        if (error) {
          responseErrorCountArticle(res);
        } else {
          for (var i = 0; i != results.rows.length; i++)
            delete results.rows[i].user_id;
          res.status(StatusCodes.OK).json({
            data: results.rows,
            meta: {
              pagination: {
                page:
                  req.query.pagination == undefined
                    ? 1
                    : Number(req.query.pagination),
                pageSize: 10,
                pageCount: Math.ceil(resu.rows[0].count / 10),
                total: Number(resu.rows[0].count),
              },
            },
          });
        }
      });
    }
  );
}


export async function getArticles(req: Request, res: Response) {
  var element = await verifToken(req.headers.authorization, res);
  var token = await JSON.parse(element);
  if (element != '{ "error": "error" }') {
    if (req.query.search != undefined) {
      getArticlesToDbWithSearch(req, res, token.payload.id);
    } else {
      getArticlesToDb(req, res, token.payload.id);
    }
  }
}