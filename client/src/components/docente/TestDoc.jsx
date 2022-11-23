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
        const res = await api.getTests();
        console.log(res);
        if (res.data.status === 200) {
          res.data.tests.forEach((item) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[item.numeroTes - 1][1] = item;
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
                    {!ejercicio[1].idTes ? (
                      <>
                        <h2>Test {ejercicio[0]}</h2>
                        <form
                          className="row g-3"
                          method="POST"
                          action="/api/v1/test/crearTest"
                        >
                          <input
                            type="hidden"
                            name="numero"
                            value={ejercicio[0]}
                          />
                          <div className="col-md-8">
                            <label
                              htmlFor={`inputEmail4-${ejercicio[0]}`}
                              className="form-label"
                            >
                              Nombre Actividad
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id={`inputEmail4-${ejercicio[0]}`}
                              name="nombre"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`inputAddress-${ejercicio[0]}`}
                              className="form-label"
                            >
                              Tipo de pregunta
                            </label>
                            <select
                              defaultValue={"1"}
                              className="form-select"
                              aria-label="Default select example"
                              id={`inputAddress-${ejercicio[0]}`}
                              onChange={(e) => {
                                setOption(e.target.value);
                              }}
                              name="tipo"
                            >
                              <option value={"1"}>Abierta</option>
                              <option value={"2"}>Cerrada</option>
                            </select>
                          </div>
                          {option === "1" ? (
                            <div className="col-12">
                              <label
                                htmlFor={`inputAddress2-${ejercicio[0]}`}
                                className="form-label"
                              >
                                Escriba la pregunta
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputAddress2-${ejercicio[0]}`}
                                placeholder="Pregunta"
                                name="preguntaAbierta"
                              />
                            </div>
                          ) : null}
                          {option === "2" ? (
                            <div className="col-12">
                              <label
                                htmlFor={`inputAddress2-${ejercicio[0]}`}
                                className="form-label"
                              >
                                Escriba la pregunta e indique la respuesta
                                correcta
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputAddress2-${ejercicio[0]}`}
                                placeholder="Pregunta"
                                name="preguntaCerrada"
                              />
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
                                  name="siono"
                                  id={`radiosi`}
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
                                  name="siono"
                                  id={`radiono`}
                                  value="0"
                                />
                              </div>
                            </div>
                          ) : null}
                          <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                              Enviar
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <div className="card mb-3">
                          <div className="card-body">
                            <h2>
                              Nombre de la actividad: {ejercicio[1].nombreTes}
                            </h2>
                            <h3>Pregunta: {ejercicio[1].preguntaTes}</h3>
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
                                    checked={Boolean(parseInt(ejercicio[1].respuestaTes))}
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
                                    checked={!Boolean(parseInt(ejercicio[1].respuestaTes))}
                                  />
                                </div>
                              </>
                            ) : null}
                            <br />
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={async () => {
                              const res = await api.deleteTest(
                                ejercicio[1].idTes
                              );
                              console.log(res);
                              if (res.data.status) {
                                MySwal.fire({
                                  icon: "success",
                                  title: "Test eliminada",
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
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Borrar
                            Test&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default TestDoc;
