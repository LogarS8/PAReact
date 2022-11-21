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
}
