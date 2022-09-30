import { Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export function responseOK(res: Response) {
  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: StatusCodes.OK + " " + ReasonPhrases.OK,
  });
}
