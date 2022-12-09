import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export const crearTest = async (req, res) => {
  const { numero, nombre, tipo } = req.body;
  if (!numero || !nombre || !tipo) {
    return res.redirect("/app/ejercicios/test");
  }
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows2] = await pool.query(
      "SELECT * FROM test WHERE numeroTes = ? and idUsu=?;",
      [numero, id]
    );
    if (rows2.length > 0) {
      console.log("Ya tienes un test con ese número");
      return res.redirect("/app/ejercicios/test");
    }
    if (tipo === "1") {
      const { preguntaAbierta } = req.body;
      if (!preguntaAbierta) {
        return res.redirect("/app/ejercicios/test");
      }
      const data = [nombre, numero, preguntaAbierta, id];
      const [rows] = await pool.query(
        "insert into test(nombreTes, numeroTes, preguntaTes, idUsu) values (?, ?, ?, ?);",
        data
      );
      if (rows.affectedRows > 0) {
        res.redirect("/app/ejercicios/test");
      } else {
        res.json({ message: "Error al crear el test", status: 400 });
      }
    } else if (tipo === "2") {
      const { preguntaCerrada, siono } = req.body;
      if (!preguntaCerrada || !siono) {
        return res.redirect("/app/ejercicios");
      }
      console.log(siono);
      const data = [nombre, numero, preguntaCerrada, siono, id];
      const [rows] = await pool.query(
        "insert into test(nombreTes, numeroTes, preguntaTes, respuestaTes, idUsu) values (?, ?, ?, ?, ?);",
        data
      );
      if (rows.affectedRows > 0) {
        res.redirect("/app/ejercicios");
      } else {
        res.json({ message: "Error al crear el test", status: 400 });
      }
    } else {
      res.json({
        message: "Error al crear el test: Opción inválida",
        status: 400,
      });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
export const getTests = async (req, res) => {
  const token = req.session?.token;
  if (token) {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [rows] = await pool.query("SELECT * FROM test WHERE idUsu=?;", [id]);
    if (rows.length > 0) {
      res.json({ message: "Tests obtenidos", status: 200, tests: rows });
    } else {
      res.json({ message: "No hay tests", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
export const deleteTest = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.redirect("/app/ejercicios/test");
  }
  const token = req.session?.token;
  if (token) {
    const [rows2] = await pool.query(
      "SELECT * FROM test WHERE idTes = ?;",
      [id]
    );
    const { id: idUser } = jwt.verify(token, SECRET_KEY);
    const { numeroTes } = rows2[0];
    const [codeResult] = await pool.query(
      "select codi from codigos where idUsu = ?;",
      [idUser]
    );
    const [alumnos] = await pool.query(
      "select idUsu from usuarios where codiAluUsu = ?;",
      [codeResult[0].codi]
    );
    for (let alumno of alumnos) {
      const [rows] = await pool.query(
        "delete from actividades where idUsu = ? and tipoAct = 'test' and numeroAct = ?;",
        [alumno.idUsu, numeroTes]
      );
      console.log([alumno.idUsu, numeroTes]);
    }
    const [rows] = await pool.query(
      "DELETE FROM test WHERE idTes=? and idUsu=?;",
      [id, idUser]
    );
    if (rows.affectedRows > 0) {
      res.json({ message: "Test eliminado", status: 200 });
    } else {
      res.json({ message: "Error al borrar el test", status: 400 });
    }
  } else {
    res.json({ message: "No se ha iniciado sesión", status: 400 });
  }
};
