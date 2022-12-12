import React, { useState, useEffect } from "react";
import { NavLeft } from "../Ejercicios";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ReadingAlu = () => {
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
        const res = await api.getReadingAlu();
        console.log("getLeccionesReading");
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
        const res2 = await api.getReadingActivity();
        console.log("getReadingActivity");
        console.log(res2);
        if (res2.data.status === 200) {
          res2.data.data.forEach((item) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[item.numeroAct - 1][1] = { state: "done" };
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

  const numbers = [1, 2, 3, 4];

  const [contadorPreguntas, setContadorPreguntas] = useState(2);

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
                style={{ width: "20%!important", float: "left" }}
              >
                {ejercicios.map((ejercicio, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <a
                      className="nav-link fw-bolder link-secondary"
                      role="tab"
                      data-bs-toggle="tab"
                      href={`#tab-${ejercicio[0]}`}
                    >
                      Lección Reading {ejercicio[0]}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className="tab-content"
                style={{ width: "80%!important", float: "right" }}
              >
                {ejercicios.map((ejercicio, index) => (
                  <div
                    className="tab-pane"
                    role="tabpanel"
                    id={`tab-${ejercicio[0]}`}
                    key={index}
                  >
                    {ejercicio[1].idLec ? (
                      <>
                        <div className="card mb-3">
                          <img
                            src={`../../public/uploads/${ejercicio[1].urlLec}`}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <form
                              action="/api/v1/actividades/createReadingActivity"
                              method="POST"
                            >
                              <input
                                type="hidden"
                                name="numeroLec"
                                value={ejercicio[1].numeroLec}
                              />
                              <h5>
                                {ejercicio[1].respuestaLec?.split(":::")[0]}
                              </h5>
                              {numbers.map((number, index) => {
                                const [pregunta, respuesta, ...rest] =
                                  ejercicio[1]?.respuestaLec?.split(":::");
                                if (rest[index]) {
                                  return (
                                    <div className="form-check" key={index}>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="flexCheckDefault"
                                        name="respuesta"
                                        value={rest[index]}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                      >
                                        {rest[index]}
                                      </label>
                                    </div>
                                  );
                                }
                              })}

                              <hr />
                              <div className="d-grid gap-2">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  Enviar respuesta
                                </button>
                              </div>
                            </form>
                            <br />
                          </div>
                        </div>
                      </>
                    ) : null}
                    {!ejercicio[1].idLec && ejercicio[1]?.state !== "done" ? (
                      <h4>Esperando a que el profesor asigne la leccion</h4>
                    ) : null}
                    {ejercicio[1].state === "done" ? (
                      <h4>Ya has contestado esta leccion</h4>
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

export default ReadingAlu;
