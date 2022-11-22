import { Router } from "express";
import { genCode, getCode, deleteStudent } from "../controllers/docente.controller.js";

const router = Router();

router.get("/genCode", genCode);
router.get("/getCode", getCode);
router.delete("/deleteStudent/:id", deleteStudent);


export default router;