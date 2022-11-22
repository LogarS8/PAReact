import { Router } from "express";
import multer from "../multer.js";

import {
  crearLeccionVocabulary,
  getLeccionesVocabulary,
  deleteLeccionVocabulary,
  crearLeccionWriting,
  getLeccionesWriting,
  deleteLeccionWriting,
} from "../controllers/lecciones.controller.js";

const router = Router();

router.post("/crearLeccionVocabulary", multer, crearLeccionVocabulary);
router.get("/getLeccionesVocabulary", getLeccionesVocabulary);
router.delete("/deleteLeccionVocabulary/:id", deleteLeccionVocabulary);

router.post("/crearLeccionWriting", multer, crearLeccionWriting);
router.get("/getLeccionesWriting", getLeccionesWriting);
router.delete("/deleteLeccionWriting/:id", deleteLeccionWriting);

export default router;
