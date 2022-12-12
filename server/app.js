//import modules
import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import cookieParser from "cookie-parser";

//custom import
import { NODE_ENV, PORT, SECRET_KEY } from "./config.js";
import { pool } from "./DB/pool.js";

//import routes
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import docenteRoutes from "./routes/docente.routes.js";
import alumnoRoutes from "./routes/alumno.routes.js";
import leccionesRoutes from "./routes/lecciones.routes.js";
import testRoutes from "./routes/test.routes.js";
import materialesRoutes from "./routes/materiales.routes.js";
import actividadesRoutes from "./routes/actividades.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { authUserLogin, userCanAccess } from "./middleware/auth.mid.js";

//dirname
const __dirname = dirname(fileURLToPath(import.meta.url));
export const __public = join(__dirname, "../client/dist");

//session store
const sessionStore = new MySQLStore({}, pool);

const app = express();

//middlewares
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookies
app.use(cookieParser());
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    key: "session_cookie_PA",
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
//static files
app.use(express.static(__public)); //esta es la linea que te digo

app.use("/", (req, res, next) => {
  const { originalUrl: url } = req;
  if (url.startsWith("/api/v1")) {
    next();
  } else {
    res.sendFile(join(__public, "index.html"));
  }
});

//routes
app.use("/api/v1/p", indexRoutes);

//api routes
app.use("/api/v1/users", authUserLogin, usersRoutes);
app.use("/api/v1/utils/docente",  docenteRoutes);
app.use("/api/v1/utils/alumno",  alumnoRoutes);
app.use("/api/v1/lecciones", leccionesRoutes)
app.use("/api/v1/test", testRoutes)
app.use("/api/v1/materiales", materialesRoutes)
app.use("/api/v1/actividades", actividadesRoutes)
app.use("/api/v1/utils/admin", adminRoutes)


//server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
