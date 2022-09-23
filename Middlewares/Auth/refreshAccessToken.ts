import express, { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateAccesToken } from "../../Function/Utils/generateToken";
import { verifToken } from "../../Function/Utils/verifToken";
const bcrypt = require("bcrypt");

export async function refreshAccessToken(req: Request, res: Response) {
  var element = await verifToken(req.headers.authorization, res);
  var token = await JSON.parse(element);
  if (element != '{ "error": "error" }') {
    var user = {
      id: token.payload.id,
      email: token.payload.email,
    };
    res.status(StatusCodes.OK).json(generateAccesToken(user));
  }
  
}
