import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../handler/async.handler";
import { errorHandler } from "../handler/error.handler";
import { UserRoleType } from "../entity/userRole.enum";

export const RoleGuard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userDetails = req.user;

    if (!userDetails) {
      return errorHandler(res, "Unauthorized access denied", 401);
    }

    // Check if the role is of Problem Setter or not :-
    if (userDetails.roleName !== UserRoleType.ProblemSetter) {
      return errorHandler(res, "Not Allowed To access", 403);
    }

    next()
  }
);
