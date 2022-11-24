import React, { useContext, useState, useEffect } from "react";
import { userAPI as api } from "../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthProvider";
import ReadingDoc from "./docente/ReadingDoc";
import WritingDoc from "./docente/WritingDoc";
import ListeningDoc from "./docente/ListeningDoc";
import TestDoc from "./docente/TestDoc";
import TestAlu from "./alumno/TestAlu";
import ReadingAlu from "./alumno/ReadingAlu";

const MySwal = withReactContent(Swal);

export const NavLeft = () => {
  return (
    <div
      className="col-md-6"
      style={{ marginTop: 84, paddingRight: 437, marginRight: -231 }}
    >
      <section className="position-relative py-4 py-xl-5">
        <div className="container position-relative">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="d-flex flex-column justify-content-center align-items-start h-100">
                <div className="d-flex align-items-center p-3">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      type="button"
                      style={{ marginLeft: 33 }}
                    >
                      Lecciones
                    </button>
                    <div className="dropdown-menu">
                      <Link
                        className="dropdown-item"
                        to={`/app/ejercicios`}
                        relative="route"
                      >
                        Vocabulary
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={`/app/ejercicios/reading`}
                      >
                        Reading
                      </Link>
                      {/* <Link
                        className="dropdown-item"
                        to={`/app/ejercicios/listening`}
                      >
                        Listening
                      </Link> */}
                      <Link
                        className="dropdown-item"
                        to={`/app/ejercicios/writing`}
                      >
                        Writing
                      </Link>
                    </div>
                  </div>
                  <div className="px-2">
                    <h6 className="mb-0"></h6>
                    <p className="mb-0"></p>
                  </div>
                </div>

                <div className="d-flex align-items-center p-3">
                  <Link
                    className="btn btn-primary"
                    role="button"
                    style={{
                      borderRadius: 48,
                      fontSize: 26,
                      background: "rgb(28,119,252)",
                      fontamily: "Noto Sans Inscriptional Pahlavi, sans-serif",
                      fontWeight: "bold",
                      width: 187.75,
                      borderWidth: 0,
                    }}
                    to={`/app/ejercicios/test`}
                  >
                    Test
                  </Link>
                  <div className="px-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const IndexDoc = () => {
  const [ejercicios, setEjercicios] = useState([
    [1, {}],
    [2, {}],
    [3, {}],
    [4, {}],
    [5, {}],
    [6, {}],
    [7, {}],
    [8, {}],
    [9, {}],
    [10, {}],
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.getLeccionesVocabulary();
        if (res.data.status === 200) {
          res.data.data.forEach((item) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[item.numeroLec - 1][1] = item;
              return newEjercicios;
            });
          });
        }
        console.log(res.data?.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <NavLeft></NavLeft>
          <div
            className="col-md-6 flex-fill"
            style={{ marginTop: 83, paddingLeft: 52 }}
          >
            <div className="mx-5">
              <ul
                className="nav nav-tabs flex-column g-5"
                role="tablist"
                style={{ width: "20%", float: "left" }}
              >
                {ejercicios.map((item, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <a
                      className={`nav-link fw-bolder link-secondary `}
                      role="tab"
                      data-bs-toggle="tab"
                      href={`#tab-${item[0]}`}
                    >
                      Lección {item[0]}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className="tab-content pl-3"
                style={{ width: "80%", float: "right" }}
              >
                {ejercicios.map((item, index) => (
                  <div
                    className="tab-pane"
                    role="tabpanel"
                    id={`tab-${item[0]}`}
                    key={index}
                  >
                    {!item[1].respuestaLec ? (
                      <>
                        <h2>Leccion {item[0]}</h2>
                        <form
                          className="row g-3"
                          encType="multipart/form-data"
                          method="POST"
                          action="/api/v1/lecciones/crearLeccionVocabulary"
                        >
                          <div className="mb-3">
                            <label
                              htmlFor={`fileImg-${item[0]}`}
                              className="form-label"
                            >
                              Elige una imagen
                            </label>
                            <input
                              className="form-control form-control-sm"
                              id={`fileImg-${item[0]}`}
                              name={`fileImg`}
                              type="file"
                            />
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor={`staticEmail2-${item[0]}`}
                              className="visually-hidden"
                            >
                              Respuesta
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control-plaintext"
                              id={`staticEmail2-${item[0]}`}
                              placeholder="Ingresa la respuesta"
                              name={`respuesta`}
                            />
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor={`inputPassword2-${item[0]}`}
                              className="visually-hidden"
                            >
                              Palabra
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id={`inputPassword2-${item[0]}`}
                              placeholder="Escribe la palabra"
                              name="palabra"
                            />
                            <input
                              type="hidden"
                              value={item[0]}
                              name="numero"
                            />
                          </div>
                          <div className="col-auto">
                            <button
                              type="submit"
                              className="btn btn-primary mb-3"
                            >
                              Enviar
                            </button>
                          </div>
                        </form>
                        <hr />
                      </>
                    ) : (
                      <>
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            src={`../public/uploads/${item[1].urlLec}`}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <h5 className="card-title">Respuesta correcta</h5>
                            <input
                              type="text"
                              className="form-control"
                              readOnly
                              id={`inputPassword3-${item[0]}`}
                              value={item[1].respuestaLec}
                            />
                            <br />
                          </div>
                        </div>
                        <hr />
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={async () => {
                              const res = await api.deleteLeccionVocabulary(
                                item[1].idLec
                              );
                              console.log(res);
                              if (res.data.status) {
                                MySwal.fire({
                                  icon: "success",
                                  title: "Lección eliminada",
                                  text: res.data.message,
                                  showConfirmButton: false,
                                  timer: 1500,
                                }).then(() => {
                                  window.location.reload();
                                });
                              } else {
                                MySwal.fire({
                                  icon: "error",
                                  title: "Error al eliminar",
                                  text: res.data.message,
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                              }
                            }}
                          >
                            Borrar lección
                          </button>
                        </div>
                        <br />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexAlu = () => {
  const [ejercicios, setEjercicios] = useState([
    [1, {}],
    [2, {}],
    [3, {}],
    [4, {}],
    [5, {}],
    [6, {}],
    [7, {}],
    [8, {}],
    [9, {}],
    [10, {}],
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.getVocabularyAlu();
        console.log(res);
        if (res.data.status === 200) {
          res.data.data.forEach((item) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[item.numeroLec - 1][1] = item;
              return newEjercicios;
            });
          });
        }
        const res2 = await api.getVocabularyActivity();
        if (res2.data.status === 200) {
          res2.data.data.forEach((item) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[item.numeroAct - 1][1] = { state: "done" };
              return newEjercicios;
            });
          });
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <NavLeft></NavLeft>
          <div
            className="col-md-6 flex-fill"
            style={{ marginTop: 83, paddingLeft: 52 }}
          >
            <div className="mx-5">
              <ul
                className="nav nav-tabs flex-column g-5"
                role="tablist"
                style={{ width: "20%", float: "left" }}
              >
                {ejercicios.map((item, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <a
                      className={`nav-link fw-bolder link-secondary `}
                      role="tab"
                      data-bs-toggle="tab"
                      href={`#tab-${item[0]}`}
                    >
                      Lección {item[0]}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className="tab-content pl-3"
                style={{ width: "80%", float: "right" }}
              >
                {ejercicios.map((item, index) => (
                  <div
                    className="tab-pane"
                    role="tabpanel"
                    id={`tab-${item[0]}`}
                    key={index}
                  >
                    {!item[1].respuestaLec && item[1]?.state !== "done" ? (
                      <>
                        <h2>Esperando que el profesor suba la leccion</h2>
                        <hr />
                      </>
                    ) : null}
                    {item[1].respuestaLec ? (
                      <form
                        action="/api/v1/actividades/createVocabularyActivity"
                        method="POST"
                      >
                        <input type={"hidden"} value={item[0]} name="numero" />
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            src={`../public/uploads/${item[1].urlLec}`}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <h5 className="card-title">Respuesta correcta</h5>
                            <input
                              type="text"
                              className="form-control"
                              id={`inputPassword3-${item[0]}`}
                              name="respuesta"
                            />
                            <br />
                          </div>
                        </div>
                        <hr />
                        <div className="d-grid gap-2">
                          <button className="btn btn-primary" type="submit">
                            Enviar respuesta
                          </button>
                        </div>
                      </form>
                    ) : null}
                    {item[1]?.state === "done" ? (
                      <h1>Ya has resuelto esta actividad :)</h1>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Ejercicios = () => {
  const { user, setUser, code } = useContext(AuthContext);

  const rol = user?.rol;
  const nav = useNavigate();

  useEffect(() => {
    if (!code) {
      nav("/app");
    }
  }, [code]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={rol === "docente" ? <IndexDoc /> : <IndexAlu />}
        />
        <Route
          path="/reading"
          element={rol === "docente" ? <ReadingDoc /> : <ReadingAlu/>}
        />
        {/* <Route
          path="/listening"
          element={
            rol === "docente" ? <ListeningDoc/> : <h1>listening alu</h1>
          }
        /> */}
        <Route
          path="/writing"
          element={rol === "docente" ? <WritingDoc /> : <h1>writing alu</h1>}
        />
        <Route
          path="/test"
          element={rol === "docente" ? <TestDoc /> : <TestAlu />}
        />
      </Routes>
    </>
  );
};

export default Ejercicios;
