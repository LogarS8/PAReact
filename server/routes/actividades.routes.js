import { Router } from "express";
import {
  createTestActivity,
  getTestsActivity,
  createVocabularyActivity,
  getVocabularyActivity,
  getReadingActivity,
  createReadingActivity,
} from "../controllers/actividades.controller.js";

const router = Router();

router.post("/createTestActivity", createTestActivity);
router.get("/getTestsActivity", getTestsActivity);

router.post("/createVocabularyActivity", createVocabularyActivity);
router.get("/getVocabularyActivity", getVocabularyActivity);

router.post("/createReadingActivity", createReadingActivity);
router.get("/getReadingActivity", getReadingActivity);

export default router;
