import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import {
  responseTokenNotFound,
  responseTokenExpired,
  responseTokenInvalid,
} from "../Response/responseToken";

const jwt = require("jsonwebtoken");
dotenv.config();

export async function verifRefreshToken(
  authorization: any,
  res: Response
): Promise<any> {
  try {
    if (authorization != undefined) {
      var token = authorization.split(" ");
      if (token[0] != "Bearer") throw { message: "jwt invalid" };
      else {
        jwt.verify(token[1], process.env.REFRESH_TOKEN_SECRET);
        const decodedToken = jwt.decode(token[1], {
          complete: true,
        });
        return JSON.stringify(decodedToken);
      }
    } else {
      responseTokenNotFound(res);
      return '{ "error": "error" }';
    }
  } catch (error: any) {
    if (error.message === "jwt expired") {
      responseTokenExpired(res);
      return '{ "error": "error" }';
    } else {
      responseTokenInvalid(res);
      return '{ "error": "error" }';
    }
  }
}

export async function verifToken(
  authorization: any,
  res: Response
): Promise<any> {
  try {
    if (authorization != undefined) {
      var token = authorization.split(" ");
      if (token[0] != "Bearer") throw { message: "jwt invalid" };
      else {
        jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET);
        const decodedToken = jwt.decode(token[1], {
          complete: true,
        });
        return JSON.stringify(decodedToken);
      }
    } else {
      responseTokenNotFound(res);
      return '{ "error": "error" }';
    }
  } catch (error: any) {
    if (error.message === "jwt expired") {
      responseTokenExpired(res);
      return '{ "error": "error" }';
    } else {
      responseTokenInvalid(res);
      return '{ "error": "error" }';
    }
  }
}
