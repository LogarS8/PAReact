import {Router} from "express";
import {getStudentsByCode} from "../controllers/alumno.controller.js";

const router = Router();

router.post("/getStudentsByCode", getStudentsByCode);

export default router;