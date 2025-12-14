import { Router } from "express";
import {
  signInUser,
  signUpUser,
  getMyProfile,
} from "../controller/auth.controller";
import { authMiddleware } from "../middleware/authguard.middleware";

const authRouter = Router();

authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", signInUser);
authRouter.get("/me", authMiddleware, getMyProfile);

export default authRouter;
