import { Router } from "express";
import multer from "../multer.js";

import {
  createUser,
  loginUser,
  logoutUser,
  checkSession,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/logout", logoutUser);
router.post("/createUser", multer, createUser);
router.get("/checkSession", checkSession);
router.post("/", loginUser);

export default router;
