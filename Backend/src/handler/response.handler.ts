import { Response } from "express";

export const responseHandler = (
  res: Response,
  message: string,
  status: number = 500,
  data?: any
) => {
  return res.status(status).json({
    success: true,
    message,
    status,
    data,
  });
};
