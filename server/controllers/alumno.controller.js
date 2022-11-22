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
      const newRows = rows.map(row=>{
        const {contraseñaUsu, rolUsu, ...rest} = row;
        return rest;
      })
      res.json({ message: "Alumnos encontrados", status: 200, data: newRows });
      } else {
      res.json({ message: "Aún no se a unido algún usuario", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Error al obtener alumnos", status: 400 });
  }
}