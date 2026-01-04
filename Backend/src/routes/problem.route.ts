import { Router } from "express";
import { authMiddleware } from "../middleware/authguard.middleware";
import { RoleGuard } from "../middleware/roleguard.middleware";
import {
  addNewProblem,
  getAllProblems,
} from "../controller/problem.controller";

const router = Router();

router.post("/", authMiddleware, RoleGuard, addNewProblem);
router.get("/", authMiddleware, getAllProblems);

export default router;
