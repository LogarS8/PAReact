import React, { useContext, useEffect } from "react";
import { EditCuenta, Header } from "../components/AppModules";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthProvider";

import IndexBodyDoc from "../components/docente/IndexBody";
import IndexBodyAlu from "../components/alumno/IndexBody";
import { userAPI as api } from "../API/userAPI";
import Ejercicios from "../components/Ejercicios";
import ActividadesDoc from "../components/docente/ActividadesDoc";
import MaterialDoc from "../components/docente/MaterialDoc";
import MaterialAlu from "../components/alumno/MaterialAlu";
import Panel from "../components/admin/Panel";
import NotFound from "./NotFound";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  const rol = user?.rol;

  const nav = useNavigate();

  useEffect(() => {
    console.log(user);
    async function fetchData() {
      try {
        const res = await api.checkSession();
        console.log(res);
        if (res.data.status === 200) {
          setUser(res.data.user);
        } else {
          nav("/login", {
            state: {
              message: "Debes iniciar sesion para acceder a esta pagina",
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (!user) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      {rol !== "admin" ? <Header rol={rol} /> : null}
      <br />
      <br />
      <Routes>
        <Route
          path={rol === "admin" ? "/*" : "/"}
          element={
            rol === "admin" ? (
              <Panel />
            ) : rol === "docente" ? (
              <IndexBodyDoc />
            ) : rol === "alumno" ? (
              <IndexBodyAlu />
            ) : null
          }
        />
        <Route
          path="/material/*"
          element={rol === "docente" ? <MaterialDoc /> : <MaterialAlu />}
        />
        <Route path="/ejercicios/*" element={<Ejercicios />}></Route>
        <Route path="/editar" element={<EditCuenta />} />
        {rol === "docente" ? (
          <Route path="/actividades" element={<ActividadesDoc />} />
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
