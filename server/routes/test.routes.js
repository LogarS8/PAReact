import { Router } from "express";

import { crearTest, getTests, deleteTest } from "../controllers/test.controller.js";

const router = Router();

router.post("/crearTest", crearTest);
router.get("/getTests", getTests);
router.delete("/deleteTest/:id", deleteTest);

export default router;