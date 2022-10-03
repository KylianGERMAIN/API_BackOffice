import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function responseBadPassword(res: Response) {
  res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: StatusCodes.FORBIDDEN + " badpassword",
  });
}

export function responseUserNotFound(res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    message: StatusCodes.NOT_FOUND + " user not found",
  });
}

export function responseErrorWhileGeneratingToken(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR + " error while generating the salt",
  });
}

export function responseErrorWhileHashingToken(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR + " error while hashing the token",
  });
}

export function responseEmailAlreadyExist(res: Response) {
  res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: StatusCodes.FORBIDDEN + " your email already exists",
  });
}

export function responseDeleteNotYourAccount(res: Response) {
  res.status(StatusCodes.UNAUTHORIZED).json({
    statusCode: StatusCodes.UNAUTHORIZED,
    message:
      StatusCodes.UNAUTHORIZED +
      " you are trying to delete an account that is not yours",
  });
}

export function responseErrorDeletingAccount(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " error while deleting your account in the database",
  });
}

export function responseErrorSearchingAccount(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " error while searching for your account in the database",
  });
}

export function responseErrorAddingAccount(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " an error was detected when adding the user to the database",
  });
}

export function responseErrorChangePassword(res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      StatusCodes.INTERNAL_SERVER_ERROR +
      " an error was detected when replacing the password in the database",
  });
}
