import { Router } from "express";
import {
  createTestActivity,
  getTestsActivity,
  createVocabularyActivity,
  getVocabularyActivity,
  getReadingActivity,
  createReadingActivity,
  createWritingActivity,
  getWritingActivity,
  getActividades
} from "../controllers/actividades.controller.js";
import multer from "../multer.js";

const router = Router();

router.post("/createTestActivity", createTestActivity);
router.get("/getTestsActivity", getTestsActivity);

router.post("/createVocabularyActivity", createVocabularyActivity);
router.get("/getVocabularyActivity", getVocabularyActivity);

router.post("/createReadingActivity", createReadingActivity);
router.get("/getReadingActivity", getReadingActivity);

router.post("/createWritingActivity", multer, createWritingActivity);
router.get("/getWritingActivity", getWritingActivity);

router.get("/getActividades/:id", getActividades)

export default router;
