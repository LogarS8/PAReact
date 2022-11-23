import { pool } from "../DB/pool.js";
import { NODE_ENV, SECRET_KEY } from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  // const [rows] = await pool.query("SELECT * FROM usuarios");
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } =
    req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    res.json({ message: "Todos los campos son obligatorios", status: 400 });
  }
  if (password !== confirmPassword) {
    res.json({ message: "Las contraseñas no coinciden", status: 400 });
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
      [firstName, lastName, email, encryptedPassword, image, "docente"]
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
      })

      console.log({cookie_token, session_token});

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

export const getUser = async (req, res) => {};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};


export const checkSession = async (req, res) => {
  if (req.session.token) {
    const { id, password, rol } = jwt.verify(
      req.session.token,
      SECRET_KEY
    );
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
          rol:rows[0].rolUsu,
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
}

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
