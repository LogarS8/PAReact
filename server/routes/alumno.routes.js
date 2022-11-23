import {Router} from "express";
import {getStudentsByCode, setCode, getCode} from "../controllers/alumno.controller.js";

const router = Router();

router.post("/getStudentsByCode", getStudentsByCode);
router.post("/setCode", setCode);
router.get("/getCode", getCode);

export default router;