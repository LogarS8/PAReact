//import modules
import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import cookieParser from "cookie-parser";

//custom import
import { PORT, SECRET_KEY } from "./config.js";
import { pool } from "./DB/pool.js";

//import routes
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";

//dirname
const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = join(__dirname, "../client/dist");

//session store
const sessionStore = new MySQLStore({}, pool);

const app = express();

//middlewares
app.use(cors({credentials:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__public));
app.use(cookieParser());
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    key: "session_cookie_PA",
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

//routes
app.use("/api/v1/",indexRoutes);

//api routes
app.use("/api/v1/users", usersRoutes);

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}
    dirname: ${__dirname}
    public: ${__public}
  `);
});
