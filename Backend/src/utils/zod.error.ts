import { ZodError } from "zod";
import { errorHandler } from "../handler/error.handler";
import { Response } from "express";
import { $ZodIssue } from "zod/v4/core";

export const throwZodError = (res: Response, zodError: $ZodIssue[]) => {
  let errors: string[] = [];
  if (typeof zodError === "object") {
    zodError.forEach((error) => {
      errors.push(error.message);
    });
  }

  errorHandler(res, errors, 400);
};
