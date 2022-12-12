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
router.delete("/:id", deleteDocente);
router.put("/:id", updateDocente);

export default router;