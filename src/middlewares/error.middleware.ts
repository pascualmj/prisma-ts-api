import { NextFunction, Request, Response } from "express";
import { formatResponse } from "@app/utils/formatResponse";
import { AppException } from "@app/config/AppException";

export const errorHandler = (
  error: AppException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json(
    formatResponse(error, {
      message: error.message || "Internal server error",
      responseId: error.responseId,
      code: error.statusCode,
    })
  );
};
