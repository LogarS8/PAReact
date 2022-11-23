import React, { useContext, useEffect } from "react";
import { Header } from "../components/AppModules";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthProvider";

import IndexBodyDoc from "../components/docente/IndexBody";
import IndexBodyAlu from "../components/alumno/IndexBody";
import { userAPI as api } from "../API/userAPI";
import Ejercicios from "../components/Ejercicios";
import ActividadesDoc from "../components/docente/ActividadesDoc";
import MaterialDoc from "../components/docente/MaterialDoc";

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
      <Header rol={rol} />
      <br />
      <br />
      <Routes>
        <Route
          path="/"
          element={
            rol === "docente" ? (
              <IndexBodyDoc />
            ) : (
              <IndexBodyAlu />
            )
          }
        />
        <Route path="/material" element={rol==="docente"?(<MaterialDoc/>):<h1>material alu </h1>} />
        <Route path="/ejercicios/*" element={<Ejercicios />}></Route>
        <Route path="/editar" element={<h2>DDDDDDDDDDDDDD</h2>} />
        {rol === "docente" ? (
          <Route
            path="/actividades"
            element={<ActividadesDoc/>}
          />
        ) : null}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
};

export default App;
