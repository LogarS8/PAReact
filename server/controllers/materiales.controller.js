import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";
import { __public } from "../app.js";
import { unlink } from "fs/promises";
import { join } from "path";

export const getMateriales = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      `SELECT * FROM material WHERE idUsu = ?`,
      [id]
    );
    if (rows.length > 0) {
      res.json({ message: "Materiales encontrados", status: 200, data: rows });
    } else {
      res.json({ message: "No se encontraron materiales", status: 400 });
    }
  } else {
    res.json({ message: "No tienes permisos", status: 400 });
  }
}
export const createMaterial = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const { nombre, texto} = req.body;
    const filename = req.file?.filename;
    const [rows] = await pool.query(
      `INSERT INTO material (nombreMat, textoMat, fileMat, idUsu) VALUES (?, ?, ?, ?)`,
      [nombre, texto, filename, id]
    );
    if (rows.affectedRows > 0) {
      res.json({ message: "Material creado", status: 200 });
    } else {
      res.json({ message: "Error al crear el material", status: 400 });
    }
  } else {
    res.json({ message: "No tienes permisos", status: 400 });
  }
}
export const deleteMaterial = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const { id:idM } = req.params;

    const [row1] = await pool.query(
      `SELECT * FROM material WHERE idMat = ? AND idUsu = ?`,
      [idM, id]
    );
    if (row1.length > 0) {
      const { fileMat } = row1[0];
      unlink(join(__public, `public/uploads/${fileMat}`), (err) =>
        console.log(err)
      )
        .then(() => {
          console.log("Archivo eliminado");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    const [rows] = await pool.query(
      `DELETE FROM material WHERE idMat = ? AND idUsu = ?`,
      [idM, id]
    );
    if (rows.affectedRows > 0) {
      
      res.json({ message: "Material eliminado", status: 200 });
    } else {
      res.json({ message: "Error al eliminar el material", status: 400 });
    }
  } else {
    res.json({ message: "No tienes permisos", status: 400 });
  }
}
export const getMaterialesAlu = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      `SELECT codiAluUsu FROM usuarios WHERE idUsu = ?`,
      [id]
    );
    if (rows.length > 0) {
      
      const [rows2] = await pool.query(
        `SELECT idUsu FROM codigos WHERE codi = ?`,
        [rows[0].codiAluUsu]
      );
      if (rows2.length > 0) {
        const [rows3] = await pool.query(
          `SELECT * FROM material WHERE idUsu = ?`,
          [rows2[0].idUsu]
        );
        console.log(rows3);
        if (rows3.length > 0) {
          res.json({ message: "Materiales encontrados", status: 200, data: rows3 });
        } else {
          res.json({ message: "No se encontraron materiales material", status: 400 });
        }
      } else {
        res.json({ message: "No se encontraron materiales codigos", status: 400 });
      }

    } else {
      res.json({ message: "No se encontraron materiales usuarios", status: 400 });
    }
  } else {
    res.json({ message: "No tienes permisos", status: 400 });
  }
}