import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

const jwt = require("jsonwebtoken");
dotenv.config();

export async function verifToken(
  authorization: any,
  res: Response
): Promise<any> {
  try {
    if (authorization != undefined) {
      var token = authorization.split(" ");
      if (token[0] != "Bearer") throw { message: "jwt invalid" };
      else {
        jwt.verify(token[1], process.env.TOKEN_SECRET);
        const decodedToken = jwt.decode(token[1], {
          complete: true,
        });
        return JSON.stringify(decodedToken);
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: StatusCodes.NOT_FOUND + " jwt not found",
      });
      return '{ "error": "error" }';
    }
  } catch (error: any) {
    if (error.message === "jwt expired") {
      res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: StatusCodes.UNAUTHORIZED + " jwt expired",
      });
      return '{ "error": "error" }';
    } else {
      console.log(error);
      res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: StatusCodes.UNAUTHORIZED + " jwt invalid",
      });
      return '{ "error": "error" }';
    }
  }
}
