import { Router } from "express";
import { pool } from "../DB/pool.js";

const router = Router();

router.get("/ping", async (req, res) => {
  const result = await pool.query("select 1+1 as solution")
  res.json(result[0][0].solution);
});

export default router;
