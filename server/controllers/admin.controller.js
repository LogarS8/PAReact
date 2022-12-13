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

  const [code] = await pool.query("select codi from codigos where idUsu = ?", [
    id,
  ]);
  if (code.length === 0)
    return res.json({ message: "No se pudo eliminar el docente", status: 400 });

  const { codi } = code[0];

  const [getAlu] = await pool.query(
    "select * from usuarios where codiAluUsu = ?",
    [codi]
  );

  for (let alu of getAlu) {
    const { idUsu } = alu;
    const [url] = await pool.query(
      "select respuestaAct from actividades where idUsu = ?",
      [idUsu]
    );

    for (let u of url) {
      const { respuestaAct } = u;
      if (respuestaAct.endsWith(".pdf")) {
        await unlink(join(__public, `public/uploads/${respuestaAct}`), (err) =>
          console.log(err)
        )
          .then(() => console.log("Archivo eliminado"))
          .catch((err) => console.log(err));
      }
    }
    const [delAct] = await pool.query(
      "delete from actividades where idUsu = ?",
      [idUsu]
    );
  }

  const [setCode] = await pool.query(
    "update usuarios set codiAluUsu = null where codiAluUsu = ?",
    [codi]
  );

  const [delCode] = await pool.query("delete from codigos where idUsu = ?", [
    id,
  ]);

  const [url] = await pool.query("select * from lecciones where idUsu = ?", [
    id,
  ]);

  for (let u of url) {
    const { urlLec } = u;
    if (urlLec) {
      await unlink(join(__public, `public/uploads/${urlLec}`), (err) =>
        console.log(err)
      )
        .then(() => console.log("Archivo eliminado"))
        .catch((err) => console.log(err));
    }
  }

  const [delLecc] = await pool.query("delete from lecciones where idUsu = ?", [
    id,
  ]);

  const [urlMat] = await pool.query("select * from material where idUsu = ?", [
    id,
  ]);

  for (let u of urlMat) {
    const { fileMat } = u;
    if (fileMat) {
      await unlink(join(__public, `public/uploads/${fileMat}`), (err) =>
        console.log(err)
      )
        .then(() => console.log("Archivo eliminado"))
        .catch((err) => console.log(err));
    }
  }

  const [delMat] = await pool.query("delete from material where idUsu = ?", [
    id,
  ]);

  const [delTest] = await pool.query("delete from test where idUsu = ?", [id]);

  await unlink(join(__public, `public/uploads/${rows[0].imgurlUsu}`), (err) =>
    console.log(err)
  )
    .then(() => console.log("Archivo eliminado"))
    .catch((err) => console.log(err));

  const [del] = await pool.query("DELETE FROM usuarios where idUsu = ?", [id]);
  if (del.affectedRows === 0)
    return res.json({ message: "No se pudo eliminar el docente", status: 400 });
  return res.json({ message: "Docente eliminado", status: 200 });
};

export const updateDocente = async (req, res) => {};
