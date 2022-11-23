import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export const genCode = async (req, res) => {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "0123456789";
  const code = [];
  for (let i = 0; i < 3; i++) {
    code.push(abc[Math.floor(Math.random() * abc.length)]);
  }
  for (let i = 0; i < 3; i++) {
    code.push(num[Math.floor(Math.random() * num.length)]);
  }

  const token = req.session?.token;

  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);

    const [rows2] = await pool.query("SELECT * FROM codigos WHERE idUsu = ?;", [
      id,
    ]);

    if (rows2.length > 0) {
      return res.json({
        message: "Ya tienes un código",
        status: 400,
      });
    }

    const [rows1] = await pool.query("SELECT * FROM codigos WHERE codi = ?;", [
      code.join(""),
    ]);

    if (rows1.length > 0) {
      return res.json({
        message: "El código ya existe, intente nuevamente",
        status: 400,
      });
    }

    const [rows] = await pool.query(
      "insert into codigos(codi, idUsu) values (?, ?);",
      [code.join(""), id]
    );
    if (rows.affectedRows > 0) {
      res.json({
        message: "Código generado",
        status: 200,
        code: code.join(""),
      });
    } else {
      res.json({
        message: "Error al generar el código",
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

export const getCode = async (req, res) => {
  const token = req.session?.token;

  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      "select codi from codigos where idUsu = ?;",
      [id]
    );
    if (rows.length > 0) {
      res.json({
        message: "Código obtenido",
        status: 200,
        code: rows[0].codi,
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
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "update usuarios set codiAluUsu = null where idUsu = ?;",
      [id]
    );
    if (rows.affectedRows > 0) {
      res.json({
        message: "Alumno eliminado",
        status: 200,
      });
    }else{
      res.json({
        message: "Error al eliminar el alumno",
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error al eliminar el alumno",
      status: 400,
    });
    
  }
    
};
