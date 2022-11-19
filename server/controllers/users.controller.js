import { pool } from "../DB/pool.js";
import bcrypt from "bcrypt";

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
      [firstName, lastName, email, encryptedPassword, image, "alumno"]
    )
    .catch((err) => {
      console.log(err);
    });
  if (result) {
    console.log(result?.insertId)
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
    res.json({message: "Todos los campos son obligatorios", status: 400});
  }

  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE correoUsu = ?;",
    [email]
  );
  if (rows.length > 0) {
    const isPassValid = await bcrypt.compare(password, rows[0].contraseñaUsu)
    console.log(isPassValid);
    if (isPassValid) {
      req.session.user = rows[0];
      req.session.save((err) => {
        if (!err) {
          return res.json({ message: "Usuario logueado", status: 200 });
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
  } 
  else {
    return res.json({
      message: "Usuario o contraseña incorrectos",
      status: 400,
    });
  }
};

export const getUser = async (req, res) => {};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
