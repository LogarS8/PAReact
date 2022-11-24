import { Router } from "express";
import { getMateriales, createMaterial, deleteMaterial, getMaterialesAlu } from "../controllers/materiales.controller.js";
import multer from "../multer.js";

const router = Router();

router.post("/createMaterial", multer, createMaterial)
router.get("/getMateriales", getMateriales);
router.delete("/deleteMaterial/:id", deleteMaterial)

router.get("/getMaterialesAlu", getMaterialesAlu);

export default router;