import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { __public } from "../app.js";
import { unlink } from "fs/promises";
import { join } from "path";

export const getUsers = async (req, res) => {
  // const [rows] = await pool.query("SELECT * FROM usuarios");
};

export const createUser = async (req, res) => {
  const { firstname, lastname, email, password, confirmpass } = req.body;

  const image = req.file?.filename;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !confirmpass ||
    !image
  ) {
    console.log(req.body);
    return res.json({
      message: "Todos los campos son obligatorios",
      status: 400,
    });
  }
  if (password !== confirmpass) {
    return res.json({ message: "Las contraseñas no coinciden", status: 400 });
  }

  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE correoUsu = ?",
    [email]
  );
  if (rows.length > 0) {
    return res.json({ message: "El correo ya está registrado", status: 400 });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool
    .query(
      "INSERT INTO usuarios(nombreUsu, apellidosUsu, correoUsu, contraseñaUsu, imgurlUsu, rolUsu) values (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, encryptedPassword, image, "alumno"]
    )
    .catch((err) => {
      console.log(err);
    });
  if (result) {
    return res.json({ message: "Usuario creado", status: 200 });
  } else {
    return res.json({
      message: "Error al crear usuario, por favor intente mas tarde",
      status: 400,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, remember } = req.body;
  if (!email || !password) {
    res.json({ message: "Todos los campos son obligatorios", status: 400 });
  }

  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE correoUsu = ?;",
    [email]
  );
  if (rows.length > 0) {
    const isPassValid = await bcrypt.compare(password, rows[0].contraseñaUsu);
    if (isPassValid) {
      const REMEMBER_TIME = remember ? 60 * 60 * 24 * 30 : 60 * 60;
      const cookie_token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + REMEMBER_TIME,
          id: rows[0].idUsu,
          firstName: rows[0].nombreUsu,
          lastName: rows[0].apellidosUsu,
          email: rows[0].correoUsu,
          image: rows[0].imgurlUsu,
        },
        SECRET_KEY
      );

      const session_token = jwt.sign(
        {
          id: rows[0].idUsu,
          password: rows[0].contraseñaUsu,
          rol: rows[0].rolUsu,
        },
        SECRET_KEY
      );

      const d = res.cookie("cookie_token", cookie_token, {
        httpOnly: NODE_ENV === "production",
        maxAge: REMEMBER_TIME,
      });

      console.log({ cookie_token, session_token });

      req.session.token = session_token;

      req.session.save((err) => {
        if (!err) {
          return res.json({
            message: "Usuario logueado",
            status: 200,
            user: {
              firstName: rows[0].nombreUsu,
              lastName: rows[0].apellidosUsu,
              email: rows[0].correoUsu,
              image: rows[0].imgurlUsu,
              rol: rows[0].rolUsu,
            },
          });
        } else {
          return res.json({
            message: "Error al iniciar sesión, por favor intente mas tarde",
            status: 400,
          });
        }
      });
    } else {
      return res.json({ message: "Contraseña incorrecta", status: 400 });
    }
  } else {
    return res.json({
      message: "Usuario o contraseña incorrectos",
      status: 400,
    });
  }
};

export const checkSession = async (req, res) => {
  if (req.session.token) {
    const { id, password, rol } = jwt.verify(req.session.token, SECRET_KEY);
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE idUsu = ? AND contraseñaUsu = ?;",
      [id, password]
    );
    if (rows.length > 0) {
      return res.json({
        message: "Sesión iniciada",
        status: 200,
        user: {
          firstName: rows[0].nombreUsu,
          lastName: rows[0].apellidosUsu,
          email: rows[0].correoUsu,
          image: rows[0].imgurlUsu,
          rol: rows[0].rolUsu,
        },
      });
    } else {
      return res.json({
        message: "Error al iniciar sesión, por favor intente mas tarde",
        status: 400,
      });
    }
  } else {
    return res.json({ message: "No hay sesión iniciada", status: 400 });
  }
};

export const logoutUser = async (req, res) => {
  const { cookie_token } = req.cookies;
  if (cookie_token) {
    req.session.destroy((err) => {
      if (!err) {
        res.clearCookie("cookie_token");
        res.json({ message: "Usuario deslogueado", status: 200 });
      } else {
        res.json({
          message: "Error al cerrar sesión, por favor intente mas tarde",
          status: 400,
        });
      }
    });
  } else {
    return res.json({ message: "No hay usuario logueado", status: 400 });
  }
};
export const editarCuenta = async (req, res) => {
  const token = req.session.token;
  const { id } = jwt.verify(token, SECRET_KEY);
  const { firstname, lastname, email, password, confirmpass } = req.body;
  if (!firstname || !lastname || !email || !password || !confirmpass) {
    console.log(req.body);
    return res.json({
      message: "Todos los campos son obligatorios",
      status: 400,
    });
  }
  if (password !== confirmpass) {
    return res.json({ message: "Las contraseñas no coinciden", status: 400 });
  }

  const [row1] = await pool.query("select * from usuarios where idUsu = ?", [
    id,
  ]);

  if (row1[0].correoUsu !== email) {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE correoUsu = ?",
      [email]
    );
    if (rows.length > 0) {
      return res.json({ message: "El correo ya está registrado", status: 400 });
    }
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "UPDATE usuarios SET nombreUsu = ?, apellidosUsu = ?, correoUsu = ?, contraseñaUsu = ?, imgurlUsu = ? WHERE idUsu = ?",
    [firstname, lastname, email, encryptedPassword, req.file?.filename, id]
  );

  if (result.affectedRows > 0) {
    unlink(join(__public, `public/uploads/${row1[0].imgurlUsu}`), (err) =>
      console.log(err)
    )
      .then(() => {
        console.log("Archivo eliminado");
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({
      message: "Cuenta editada",
      status: 200,
      user: {
        firstName: firstname,
        lastName: lastname,
        email,
        image: req.file?.filename,
        rol: row1[0].rolUsu,
      },
    });
  } else {
    return res.json({
      message: "Error al editar la cuenta, por favor intente mas tarde",
      status: 400,
    });
  }
  return res.json({ message: "Cuenta editada", status: 200 });
};
