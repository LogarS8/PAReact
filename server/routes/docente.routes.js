import { Router } from "express";
import { genCode, getCode } from "../controllers/docente.controller.js";

const router = Router();

router.get("/genCode", genCode);
router.get("/getCode", getCode);


export default router;