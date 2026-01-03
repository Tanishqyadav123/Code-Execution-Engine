import { Router } from "express";
import authRouter from "./auth.route";
import commonRouter from "./common.route";
import problemRouter from "./problem.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/common", commonRouter);
router.use("/problem", problemRouter);

export default router;
