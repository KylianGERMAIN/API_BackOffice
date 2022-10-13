import express, { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  responseTokenInvalid,
  responseTokenNotFound,
} from "../../Function/Response/responseToken";
import { generateAccesToken } from "../../Function/Utils/generateToken";
const jwt = require("jsonwebtoken");

export async function refreshAccessToken(req: Request, res: Response) {
  try {
    if (req.headers.authorization != undefined) {
      var token = req.headers.authorization.split(" ");
      if (token[0] != "Bearer") throw { message: "jwt invalid" };
      else {
        const decodedToken = jwt.decode(token[1], {
          complete: true,
        });
        var tokenp = await JSON.parse(JSON.stringify(decodedToken));
        var user = {
          id: tokenp.payload.id,
          email: tokenp.payload.email,
        };
        res.status(StatusCodes.OK).json(generateAccesToken(user));
      }
    } else {
      responseTokenNotFound(res);
    }
  } catch (error: any) {
    responseTokenInvalid(res);
  }
}
