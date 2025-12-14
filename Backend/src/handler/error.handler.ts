import { Response } from "express";

export const errorHandler = (
  res: Response,
  message: string | string[] = "INTERNAL SERVER ERROR",
  status: number = 500
) => {
  if (typeof message === "object" && Array.isArray(message)) {
    message = message.join(" , ");
  }

  return res.status(status).json({
    success: false,
    message,
    status,
    timeStamp: Date.now(),
  });
};
