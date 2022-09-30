import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function responseErrorDetectDb(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: StatusCodes.INTERNAL_SERVER_ERROR + " an error was detected",
  });
}
