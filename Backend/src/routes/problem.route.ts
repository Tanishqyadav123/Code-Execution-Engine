import { Router } from "express";
import { authMiddleware } from "../middleware/authguard.middleware";
import { RoleGuard } from "../middleware/roleguard.middleware";
import { addNewProblem } from "../controller/problem.controller";

const router = Router();

router.post("/", authMiddleware, RoleGuard, addNewProblem);

export default router;
