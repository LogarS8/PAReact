import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export const getStudentsByCode = async (req, res) => {
  const { code } = req.body;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM usuarios WHERE codiAluUsu = ?`,
      [code]
    );
    if (rows.length > 0) {
      const newRows = rows.map((row) => {
        const { contraseñaUsu, rolUsu, ...rest } = row;
        return rest;
      });
      res.json({ message: "Alumnos encontrados", status: 200, data: newRows });
    } else {
      res.json({ message: "Aún no se a unido algún usuario", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Error al obtener alumnos", status: 400 });
  }
};
export const setCode = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const { code } = req.body;
    console.log(code);
    const [rows3] = await pool.query(
      `SELECT * FROM usuarios WHERE idUsu = ?`,
      [id]
    );
    if (rows3[0].codiAluUsu) {
      res.json({ message: "Ya tienes un código ", status: 400 });
    } else {
      const [rows2] = await pool.query(`SELECT * FROM codigos WHERE codi = ?`, [
        code.toUpperCase(),
      ]);
      if (rows2.length > 0) {
        const [rows] = await pool.query(
          "update usuarios set codiAluUsu = ? where idUsu = ?;",
          [code.toUpperCase(), id]
        );
        if (rows.affectedRows > 0) {
          res.json({
            message: "Código actualizado",
            status: 200,
          });
        } else {
          return res.json({
            message: "Error al actualizar el código",
            status: 400,
          });
        }
      } else {
        return res.json({
          message: "Código no encontrado",
          status: 400,
        });
      }
    }
  } else {
    return res.json({
      message: "No se ha iniciado sesión",
      status: 400,
    });
  }
};
export const getCode = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      "select codiAluUsu from usuarios where idUsu = ?;",
      [id]
    );
    console.log(rows);
    if (rows.length > 0) {
      res.json({
        message: "Código obtenido",
        status: 200,
        code: rows[0].codiAluUsu,
      });
    } else {
      res.json({
        message: "Error al obtener el código",
        status: 400,
      });
    }
  } else {
    res.json({
      message: "No se ha iniciado sesión",
      status: 400,
    });
  }
};
