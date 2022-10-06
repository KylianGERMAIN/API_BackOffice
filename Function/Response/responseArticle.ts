import { Response } from "express";
import { StatusCodes } from "http-status-codes";


export function responseArticle(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " error when calculating the number of articles",
  });
}

export function ResponseErrorNotFoundArticle(res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    message:
      StatusCodes.NOT_FOUND +
      " You can't delete this article because it does not existe",
  });
}

export function ResponseErrorCantDeleteArticle(res: Response) {
  res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: StatusCodes.FORBIDDEN + " You can't delete this article",
  });
}

export function ResponseErrorCreateArticle(res: Response) {
  res.status(StatusCodes.UNAUTHORIZED).json({
    statusCode: StatusCodes.UNAUTHORIZED,
    message:
      StatusCodes.UNAUTHORIZED +
      " an error is detected when adding the article to the database",
  });
}

export function ResponseErrorSearchingArticle(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " an error is detected while searching for the article in the database",
  });
}

export function responseArticleNotFound(res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    message: StatusCodes.NOT_FOUND + " article not found",
  });
}

export function responseErrorUpdateArticle(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " an error was detected when updating the article in the database",
  });
}

export function responseErrorPagination(res: Response) {
  res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message:
      StatusCodes.FORBIDDEN + " pagination is not a number or is inferior at 1",
  });
}

export function responseErrorCountArticle(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " error when calculating the number of articles",
  });
}