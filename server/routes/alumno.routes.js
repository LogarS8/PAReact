import {Router} from "express";
import {getStudentsByCode, setCode, getCode, getTests, getVocabularyAlu} from "../controllers/alumno.controller.js";

const router = Router();

router.post("/getStudentsByCode", getStudentsByCode);
router.post("/setCode", setCode);
router.get("/getCode", getCode);

router.get("/getTests", getTests);
router.get("/getVocabularyAlu", getVocabularyAlu)

export default router;