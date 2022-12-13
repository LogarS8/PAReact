import { Router } from "express";

import {
  createDocente, 
  getDocentes,
  deleteDocente,
  updateDocente,
} from "../controllers/admin.controller.js";

const router = Router();

router.get("/", getDocentes);
router.post("/", createDocente);
router.post("/deleteDocente", deleteDocente);
router.put("/:id", updateDocente);

export default router;