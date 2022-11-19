import { Router } from 'express';
import multer from "../multer.js";

import { getUser, createUser, loginUser, updateUser, deleteUser } from '../controllers/users.controller.js';


const router = Router();

router.post("/createUser", multer, createUser);

router.post("/", loginUser);

router.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;