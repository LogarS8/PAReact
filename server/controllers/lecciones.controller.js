import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";
import { __public } from "../app.js";
import { unlink } from "fs/promises";
import { join } from "path";
export const crearLeccionVocabulary = async (req, res) => {
  console.log(req.body);
  const { palabra, numero } = req.body;
  const filename = req?.file?.filename;
  if (!palabra || !numero || !filename) {
    return res.redirect("/app/ejercicios/vocabulary");
  }
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const data = [filename, "vocabulary", palabra, numero, id];
    console.log(data);

    const [rows2] = await pool.query(
      "SELECT * FROM lecciones WHERE numeroLec = ? and tipoLec = 'vocabulary' and idUsu = ?;",
      [numero, id]
    );

    console.log(rows2);
    if (rows2.length > 0) {
      console.log("Ya tienes una lección con ese número");
      return res.json({
        message: "Ya tienes una lección con estos datos",
        status: 400,
      });
    }

    const [rows] = await pool.query(
      "insert into lecciones(urlLec, tipoLec, respuestaLec, numeroLec, idUsu) values (?, ?, ?, ?, ?);",
      data
    );
    if (rows.affectedRows > 0) {
      res.redirect("/app/ejercicios");
    } else {
      res.json({ message: "Error al crear la lección", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};

export const getLeccionesVocabulary = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      "SELECT * FROM lecciones WHERE idUsu = ? AND tipoLec = 'vocabulary' ;",
      [id]
    );
    if (rows.length > 0) {
      res.json({ message: "Lecciones encontradas", status: 200, data: rows });
    } else {
      res.json({ message: "No tienes lecciones", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
export const deleteLeccionVocabulary = async (req, res) => {
  const { id } = req.params;
  const token = req.session?.token;
  if (token) {
    const [rows2] = await pool.query(
      "SELECT * FROM lecciones WHERE idLec = ?;",
      [id]
    );
    if (rows2.length > 0) {
      const { urlLec } = rows2[0];
      unlink(join(__public, `public/uploads/${urlLec}`), (err) =>
        console.log(err)
      )
        .then(() => {
          console.log("Archivo eliminado");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const [rows] = await pool.query("DELETE FROM lecciones WHERE idLec = ?;", [
      id,
    ]);
    if (rows.affectedRows > 0) {
      res.json({ message: "Lección eliminada", status: 200 });
    } else {
      res.json({ message: "Error al eliminar la lección", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};

export const crearLeccionWriting = async (req, res) => {
  const { data, numero } = req.body;
  const filename = req?.file?.filename;
  if (!data || !numero || !filename) {
    return res.redirect("/app/ejercicios/writing");
  }
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const data1 = [filename, "writing", data, numero, id];
    const [rows2] = await pool.query(
      "SELECT * FROM lecciones WHERE numeroLec = ? and tipoLec = 'writing' and idUsu = ?;",
      [numero, id]
    );
    if (rows2.length > 0) {
      console.log("Ya tienes una lección con ese número");
      return res.json({
        message: "Ya tienes una lección con estos datos",
        status: 400,
      });
    }
    const [rows] = await pool.query(
      "insert into lecciones(urlLec, tipoLec, respuestaLec, numeroLec, idUsu) values (?, ?, ?, ?, ?);",
      data1
    );
    if (rows.affectedRows > 0) {
      res.redirect("/app/ejercicios/writing");
    } else {
      res.json({ message: "Error al crear la lección", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
export const getLeccionesWriting = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      "SELECT * FROM lecciones WHERE idUsu = ? AND tipoLec = 'writing' ;",
      [id]
    );
    if (rows.length > 0) {
      res.json({ message: "Lecciones encontradas", status: 200, data: rows });
    } else {
      res.json({ message: "No tienes lecciones", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
export const deleteLeccionWriting = async (req, res) => {
  const { id } = req.params;
  const token = req.session?.token;
  if (token) {
    const [rows2] = await pool.query(
      "SELECT * FROM lecciones WHERE idLec = ?;",
      [id]
    );
    if (rows2.length > 0) {
      const { urlLec } = rows2[0];
      unlink(join(__public, `public/uploads/${urlLec}`), (err) =>
        console.log(err)
      )
        .then(() => {
          console.log("Archivo eliminado");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const [rows] = await pool.query("DELETE FROM lecciones WHERE idLec = ?;", [
      id,
    ]);
    if (rows.affectedRows > 0) {
      res.json({ message: "Lección eliminada", status: 200 });
    } else {
      res.json({ message: "Error al eliminar la lección", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
export const crearLeccionReading = async (req, res) => {
  const { respuesta, numero, opciones } = req.body;
  const filename = req?.file?.filename;
  if (!respuesta || !numero || !opciones || !filename) {
    return res.redirect("/app/ejercicios/reading");
  }
  const token = req.session?.token;

  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const data1 = [
      filename,
      "reading",
      [respuesta, opciones.join(":::")].join(":::"),
      numero,
      id,
    ];
    console.log(data1);
    const [rows2] = await pool.query(
      "SELECT * FROM lecciones WHERE numeroLec = ? and tipoLec = 'reading' and idUsu = ?;",
      [numero, id]
    );
    if (rows2.length > 0) {
      console.log("Ya tienes una lección con ese número");
      return res.json({
        message: "Ya tienes una lección con estos datos",
        status: 400,
      });
    }
    const [rows] = await pool.query(
      "insert into lecciones(urlLec, tipoLec, respuestaLec, numeroLec, idUsu) values (?, ?, ?, ?, ?);",
      data1
    );
    if (rows.affectedRows > 0) {
      res.redirect("/app/ejercicios/reading");
    } else {
      res.json({ message: "Error al crear la lección", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
export const getLeccionesReading = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query(
      "SELECT * FROM lecciones WHERE idUsu = ? AND tipoLec = 'reading' ;",
      [id]
    );
    if (rows.length > 0) {
      res.json({ message: "Lecciones encontradas", status: 200, data: rows });
    } else {
      res.json({ message: "No tienes lecciones", status: 400 });
    }
  }
};
export const deleteLeccionReading = async (req, res) => {
  const { id } = req.params;
  const token = req.session?.token;
  if (token) {
    const [rows2] = await pool.query(
      "SELECT * FROM lecciones WHERE idLec = ?;",
      [id]
    );
    if (rows2.length > 0) {
      const { urlLec } = rows2[0];
      unlink(join(__public, `public/uploads/${urlLec}`), (err) =>
        console.log(err)
      )
        .then(() => {
          console.log("Archivo eliminado");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const [rows] = await pool.query("DELETE FROM lecciones WHERE idLec = ?;", [
      id,
    ]);
    if (rows.affectedRows > 0) {
      res.json({ message: "Lección eliminada", status: 200 });
    } else {
      res.json({ message: "Error al eliminar la lección", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
