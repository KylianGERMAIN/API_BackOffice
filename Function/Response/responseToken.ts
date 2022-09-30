import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function responseTokenNotFound(res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    message: StatusCodes.NOT_FOUND + " jwt not found",
  });
}

export function responseTokenExpired(res: Response) {
  res.status(StatusCodes.UNAUTHORIZED).json({
    statusCode: StatusCodes.UNAUTHORIZED,
    message: StatusCodes.UNAUTHORIZED + " jwt expired",
  });
}

export function responseTokenInvalid(res: Response) {
  res.status(StatusCodes.UNAUTHORIZED).json({
    statusCode: StatusCodes.UNAUTHORIZED,
    message: StatusCodes.UNAUTHORIZED + " jwt invalid",
  });
}
