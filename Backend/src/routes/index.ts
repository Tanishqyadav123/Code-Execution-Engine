import { Router } from "express";
import authRouter from "./auth.route";
import commonRouter from "./common.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/common", commonRouter);

export default router;
