import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";
import { __public } from "../app.js";
import { unlink } from "fs/promises";
import { join } from "path";

export const createDocente = async (req, res) => {};

export const getDocentes = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM usuarios where rolUsu = 'docente'"
  );
  if (rows.length === 0)
    return res.status(400).json({ message: "No hay docentes registrados" });
  return res.json({
    message: "Docentes encontrados",
    status: 200,
    data: rows,
  });
};

export const deleteDocente = async (req, res) => {};

export const updateDocente = async (req, res) => {};
