import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

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
  const {id} = req.params;
  console.log(id);
  if (id) {
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
  }else{
    console.log("deberia entrar")
    const token = req.session?.token;
    if (!token) {
      return res.json({ message: "no estas logueado", status: 401 });
    }
    const { id: idU } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      "select * from actividades where idUsu = ?;",
      [idU]
    );
    console.log(rows)
    if (rows.length === 0) {
      return res.json({ message: "no hay actividades", status: 400 });
    }
    return res.json({ message: "ok", status: 200, data: rows });
  }
};
