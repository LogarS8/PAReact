import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

import { __public } from "../app.js";
import { unlink } from "fs/promises";
import { join } from "path";

export const createTestActivity = async (req, res) => {
  const { numero, preguntaAbierta, siono } = req.body;
  if (!numero) {
    return res.json({ message: "faltan datos", status: 400 });
  }
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows3] = await pool.query(
    "insert into actividades(tipoAct, respuestaAct, numeroAct, idUsu) values (?, ?, ?, ?);",
    ["test", preguntaAbierta || siono, numero, id]
  );
  if (rows3.length === 0) {
    return res.json({ message: "no se pudo crear la actividad", status: 400 });
  }
  return res.redirect("/app/ejercicios/test");
};
export const getTestsActivity = async (req, res) => {
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows] = await pool.query(
    "select * from actividades where idUsu = ? and tipoAct = ?;",
    [id, "test"]
  );
  if (rows.length === 0) {
    return res.json({ message: "no hay actividades", status: 400 });
  }
  return res.json({ message: "ok", status: 200, data: rows });
};
export const createVocabularyActivity = async (req, res) => {
  const { numero, respuesta } = req.body;
  if (!numero || !respuesta) {
    return res.json({ message: "faltan datos", status: 400 });
  }
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows3] = await pool.query(
    "insert into actividades(tipoAct, respuestaAct, numeroAct, idUsu) values (?, ?, ?, ?);",
    ["vocabulary", respuesta, numero, id]
  );
  if (rows3.length === 0) {
    return res.json({ message: "no se pudo crear la actividad", status: 400 });
  }
  return res.redirect("/app/ejercicios/vocabulario");
};
export const getVocabularyActivity = async (req, res) => {
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows] = await pool.query(
    "select * from actividades where idUsu = ? and tipoAct = ?;",
    [id, "vocabulary"]
  );
  if (rows.length === 0) {
    return res.json({ message: "no hay actividades", status: 400 });
  }
  return res.json({ message: "ok", status: 200, data: rows });
};
export const getReadingActivity = async (req, res) => {
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows] = await pool.query(
    "select * from actividades where idUsu = ? and tipoAct = ?;",
    [id, "reading"]
  );
  if (rows.length === 0) {
    return res.json({ message: "no hay actividades", status: 400 });
  }
  return res.json({ message: "ok", status: 200, data: rows });
};
export const createReadingActivity = async (req, res) => {
  const { numeroLec, respuesta } = req.body;
  if (!numeroLec || !respuesta) {
    return res.json({ message: "faltan datos", status: 400 });
  }
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows3] = await pool.query(
    "insert into actividades(tipoAct, respuestaAct, numeroAct, idUsu) values (?, ?, ?, ?);",
    ["reading", respuesta, numeroLec, id]
  );
  if (rows3.length === 0) {
    return res.json({ message: "no se pudo crear la actividad", status: 400 });
  }
  return res.redirect("/app/ejercicios/");
};
export const createWritingActivity = async (req, res) => {
  const { numeroLec } = req.body;
  const respuesta = req?.file?.filename;
  if (!numeroLec || !respuesta) {
    return res.json({ message: "faltan datos", status: 400 });
  }
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows3] = await pool.query(
    "insert into actividades(tipoAct, respuestaAct, numeroAct, idUsu) values (?, ?, ?, ?);",
    ["writing", respuesta, numeroLec, id]
  );
  if (rows3.length === 0) {
    return res.json({ message: "no se pudo crear la actividad", status: 400 });
  }
  return res.redirect("/app/ejercicios/");
};
export const getWritingActivity = async (req, res) => {
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows] = await pool.query(
    "select * from actividades where idUsu = ? and tipoAct = ?;",
    [id, "writing"]
  );
  if (rows.length === 0) {
    return res.json({ message: "no hay actividades", status: 400 });
  }
  return res.json({ message: "ok", status: 200, data: rows });
};
export const getActividades = async (req, res) => {
  if (req.params.id !== "undefined") {
    const { id } = req.params;
    console.log("aqui no deberia entrar");
    const token = req.session?.token;
    if (!token) {
      return res.json({ message: "no estas logueado", status: 401 });
    }
    const [rows] = await pool.query(
      "select * from actividades where idUsu = ?;",
      [id]
    );
    if (rows.length === 0) {
      return res.json({ message: "no hay actividades", status: 400 });
    }
    return res.json({ message: "ok", status: 200, data: rows });
  } else {
    console.log("deberia entrar");
    const token = req.session?.token;
    if (!token) {
      return res.json({ message: "no estas logueado", status: 401 });
    }
    const { id: idU } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      "select * from actividades where idUsu = ?;",
      [idU]
    );
    console.log(rows);
    if (rows.length === 0) {
      return res.json({ message: "no hay actividades", status: 400 });
    }
    return res.json({ message: "ok", status: 200, data: rows });
  }
};
export const setCalificacion = async (req, res) => {
  const { idAct, calificacion } = req.body;
  console.log(req.body);
  if (isNaN(calificacion)) {
    return res.json({ message: "calificacion no es un numero", status: 400 });
  }
  if (!idAct || !calificacion) {
    return res.json({ message: "faltan datos", status: 400 });
  }
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [rows] = await pool.query(
    "update actividades set califAct = ? where idAct = ?;",
    [calificacion, idAct]
  );
  if (rows.length === 0) {
    return res.json({ message: "no se pudo calificar", status: 400 });
  }
  return res.json({ message: "ok", status: 200 });
};
export const deleteActivity = async (req, res) => {
  const { id: idAct } = req.params;
  if (!idAct) {
    return res.json({ message: "faltan datos", status: 400 });
  }
  const token = req.session?.token;
  if (!token) {
    return res.json({ message: "no estas logueado", status: 401 });
  }
  const { id } = jwt.verify(token, SECRET_KEY);
  const [resp] = await pool.query("select * from actividades where idAct = ?", [
    idAct,
  ]);
  if (resp.length === 0) {
    return res.json({
      message: "no se pudo eliminar la actividad",
      status: 400,
    });
  }
  if (resp[0].respuestaAct.endsWith(".pdf")) {
    unlink(join(__public, `public/uploads/${resp[0].respuestaAct}`), (err) =>
      console.log(err)
    )
      .then(() => {
        console.log("Archivo eliminado");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [rows] = await pool.query("delete from actividades where idAct = ?;", [
    idAct,
  ]);

  if (rows.length === 0) {
    return res.json({
      message: "no se pudo eliminar la actividad",
      status: 400,
    });
  }
  return res.json({ message: "ok", status: 200 });
};
