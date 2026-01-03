import { NextFunction, Request, response, Response } from "express";
import { asyncHandler } from "../handler/async.handler";
import { signInSchema, signUpSchema } from "../validation/auth.schema";
import { throwZodError } from "../utils/zod.error";
import {
  createNewUser,
  getUserDetails,
  isEmailExist,
} from "../repository/auth.repo";
import { errorHandler } from "../handler/error.handler";
import { responseHandler } from "../handler/response.handler";
import { comparePassword, hashedPassword } from "../utils/bcrypt.utils";
import { generateAccessToken } from "../utils/jwt.utils";

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  const { success, data, error } = signUpSchema.safeParse(req.body);

  if (!success) {
    throwZodError(res, error.issues);
    return;
  }

  // Check if email exist or not
  const { email } = data;
  const isExist = await isEmailExist(email);

  if (isExist) {
    errorHandler(res, "Email already exist", 409);
    return;
  }

  // Hash the password
  const hashPassword = await hashedPassword(data.password);

  // Create the user
  await createNewUser({ ...data, password: hashPassword });

  return responseHandler(res, "New User Registered", 201);
});

export const signInUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = signInSchema.safeParse(req.body);

    if (!success) {
      throwZodError(res, error.issues);
      return;
    }

    const { email, password } = data;

    // Check if the credentials are correct :-
    const isUserExist = await isEmailExist(email);

    if (!isUserExist) {
      return errorHandler(res, "Invalid Credentials", 400);
    }

    const isValidPassword = await comparePassword(
      password,
      isUserExist.password
    );
    if (!isValidPassword) {
      return errorHandler(res, "Invalid Credentials", 400);
    }

    // Generate a Jwt Token :-

    const accessToken = generateAccessToken({
      email: isUserExist.email,
      id: isUserExist.id,
      roleId: isUserExist.roleId,
      roleName: isUserExist.RoleDetails.roleName,
    });

    return responseHandler(res, "Login Successfully", 200, {
      token: accessToken,
    });
  }
);

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      return errorHandler(res, "User not found", 400);
    }

    const userDetails = await getUserDetails(user.id);

    return responseHandler(res, "Profile Details", 200, userDetails);
  }
);
