import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../handler/async.handler";
import { errorHandler } from "../handler/error.handler";
import { verifyAccessToken } from "../utils/jwt.utils";
import prisma from "../lib/db/client";

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract the token :-
    const token = extractTheToken(req);

    if (!token) {
      return errorHandler(res, "Token not provided", 401);
    }

    // Verify the token :-
    const payload = verifyAccessToken(token);

    if (!payload.id) {
      return errorHandler(res, "Invalid Payload in token", 401);
    }

    // Check if the user present in db :-
    const userDetails = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        RoleDetails: true,
      },
    });

    if (!userDetails) {
      return errorHandler(res, "user details not found", 401);
    }

    req.user = { ...payload, roleId: userDetails.roleId };

    next();
  }
);

function extractTheToken(req: Request) {
  const token = req.headers["authorization"]?.split(" ")[1];

  return token;
}
