import React, { useState, useEffect } from "react";
import { NavLeft } from "../Ejercicios";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TestDoc = () => {
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

  const [option, setOption] = useState("1");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.getTestsAlu();
        console.log(res);
        if (res.data.status === 200) {
          res.data.data.forEach((item) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[item.numeroTes - 1][1] = item;
              return newEjercicios;
            });
          });
        }
        const res2 = await api.getTestsActivity();
        if (res2.data.status === 200) {
          res2.data.data.forEach((item) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[item.numeroAct - 1][1] = { state: "done" };
              return newEjercicios;
            });
          });
        }
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
          <NavLeft />
          <div
            className="col-md-6 flex-fill"
            style={{ marginTop: 83, paddingLeft: 52 }}
          >
            <div>
              <ul
                className="nav nav-tabs flex-column"
                role="tablist"
                style={{ width: "15%", float: "left" }}
              >
                {ejercicios.map((ejercicio, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <a
                      className="nav-link fw-bolder link-secondary"
                      role="tab"
                      data-bs-toggle="tab"
                      href={`#tab-${ejercicio[0]}`}
                    >
                      Test {ejercicio[0]}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className="tab-content"
                style={{ width: "85%", float: "right" }}
              >
                {ejercicios.map((ejercicio, index) => (
                  <div
                    key={index}
                    className="tab-pane "
                    role="tabpanel"
                    id={`tab-${ejercicio[0]}`}
                  >
                    {!ejercicio[1].idTes && ejercicio[1]?.state !== "done" ? (
                      <div className="container">
                        <div className="row">
                          Esperando a que el profesor cree el test
                        </div>
                      </div>
                    ) : null}
                    {ejercicio[1].idTes ? (
                      <>
                        <div className="card mb-3">
                          <div className="card-body">
                            <h2>
                              Nombre de la actividad: {ejercicio[1].nombreTes}
                            </h2>
                            <h3>Pregunta: {ejercicio[1].preguntaTes}</h3>
                            <form
                              action="/api/v1/actividades/createTestActivity"
                              method="POST"
                            >
                              <input
                                type={"hidden"}
                                value={ejercicio[0]}
                                name="numero"
                              />
                              {ejercicio[1].respuestaTes ? (
                                <>
                                  <div className="form-check">
                                    <label
                                      htmlFor={`radiosi`}
                                      className="form-check-label"
                                    >
                                      Si{" "}
                                    </label>
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      id={`radiosi`}
                                      name="siono"
                                      value="1"
                                    />
                                  </div>
                                  <div className="form-check">
                                    <label
                                      htmlFor={`radiono`}
                                      className="form-check-label"
                                    >
                                      No{" "}
                                    </label>
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      id={`radiono`}
                                      value="0"
                                      name="siono"
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="form-group">
                                    <label
                                      htmlFor={`preguntaAbierta`}
                                      className="form-label"
                                    >
                                      Respuesta:{" "}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id={`preguntaAbierta`}
                                      name="preguntaAbierta"
                                    />
                                  </div>
                                </>
                              )}

                              <button type="submit" className="btn btn-primary">
                                Enviar
                              </button>
                            </form>
                            <br />
                          </div>
                        </div>
                      </>
                    ) : null}
                    {ejercicio[1]?.state === "done" ? (
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

export default TestDoc;
