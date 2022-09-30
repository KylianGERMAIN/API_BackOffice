import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function ResponseErrorCantDeleteArticle(res: Response) {
  res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: StatusCodes.FORBIDDEN + " You can't delete this article",
  });
}
