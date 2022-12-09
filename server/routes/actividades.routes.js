import { Router } from "express";
import {
  createTestActivity,
  getTestsActivity,
  createVocabularyActivity,
  getVocabularyActivity,
  getReadingActivity,
  createReadingActivity,
  createWritingActivity,
  getWritingActivity
} from "../controllers/actividades.controller.js";

const router = Router();

router.post("/createTestActivity", createTestActivity);
router.get("/getTestsActivity", getTestsActivity);

router.post("/createVocabularyActivity", createVocabularyActivity);
router.get("/getVocabularyActivity", getVocabularyActivity);

router.post("/createReadingActivity", createReadingActivity);
router.get("/getReadingActivity", getReadingActivity);

router.post("/createWritingActivity", createWritingActivity);
router.get("/getWritingActivity", getWritingActivity);

export default router;
