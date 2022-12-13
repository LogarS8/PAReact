import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";
import { __public } from "../app.js";
import { unlink } from "fs/promises";
import { join } from "path";
import bcrypt from "bcrypt";

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

export const deleteDocente = async (req, res) => {
  console.log(req.body);
  const { id, password } = req.body;
  const [rows] = await pool.query("SELECT * FROM usuarios where idUsu = ?", [
    id,
  ]);
  if (rows.length === 0)
    return res.json({ message: "No hay docentes registrados", status: 400 });
  const bool = await bcrypt.compare(password, rows[0].contraseñaUsu);
  if (!bool) return res.json({ message: "Contraseña incorrecta", status: 400 });
  const [del] = await pool.query("DELETE FROM usuarios where idUsu = ?", [id]);
  if (del.affectedRows === 0)
    return res.json({ message: "No se pudo eliminar el docente", status: 400 });
  return res.json({ message: "Docente eliminado", status: 200 });
};

export const updateDocente = async (req, res) => {};
