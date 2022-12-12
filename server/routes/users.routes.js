import { Router } from "express";
import multer from "../multer.js";

import {
  createUser,
  loginUser,
  logoutUser,
  checkSession,
  editarCuenta,
  
} from "../controllers/users.controller.js";

const router = Router();

router.get("/logout", logoutUser);
router.post("/createUser", multer, createUser);
router.get("/checkSession", checkSession);
router.post("/", loginUser);
router.post("/editarCuenta", multer, editarCuenta);

export default router;
