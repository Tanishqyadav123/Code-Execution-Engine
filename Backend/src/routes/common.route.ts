import { Router } from "express";
import { getRolesDropDown } from "../controller/common.controller";

const router = Router();

router.get("/role-dropdown", getRolesDropDown);

export default router;
