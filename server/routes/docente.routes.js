import { Router } from "express";
import { genCode, getCode, deleteStudent, getAlumnos } from "../controllers/docente.controller.js";

const router = Router();

router.get("/genCode", genCode);
router.get("/getCode", getCode);
router.delete("/deleteStudent/:id", deleteStudent);
router.get("/getAlumnos", getAlumnos);


export default router;