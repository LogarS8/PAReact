import React, { useState, useEffect } from "react";
import { NavLeft } from "../Ejercicios";

const ReadingDoc = () => {
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
                            src="assets/img/ejemplo.png"
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Respuesta 1
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                              >
                                Respuesta 2
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                              >
                                Respuesta 3
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked3"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                              >
                                Respuesta 4
                              </label>
                            </div>
                            <br />
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button className="btn btn-danger" type="button">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Borrar
                            lección&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </button>
                        </div>
                        <br />
                      </>
                    ) : (
                      <>
                        <h2>Leccion {ejercicio[0]}</h2>
                        <form
                          action="/api/v1/lecciones/crearLeccionReading"
                          method="POST"
                          encType="multipart/form-data"
                        >
                          <input
                            type="hidden"
                            name="numero"
                            value={ejercicio[0]}
                          />
                          <div className="mb-3">
                            <label htmlFor="formFileSm" className="form-label">
                              Elige una imagen de lectura
                            </label>
                            <input
                              className="form-control form-control-sm"
                              id={`formFileSm-${ejercicio[0]}`}
                              type="file"
                              name="fileImg"
                            />
                          </div>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue={2}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setContadorPreguntas(e.target.value);
                            }}
                            placeholder="Selecciona el número de preguntas"
                          >
                            <option value={2}>Dos</option>
                            <option value={3}>Tres</option>
                            <option value={4}>Cuatro</option>
                          </select>
                          <br />
                          <hr />
                          {numbers.map((number, index) => {
                            if (contadorPreguntas >= number) {
                              return (
                                <div className="form-floating mb-3" key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={`floatingInput-${ejercicio[0]}-${number}`}
                                    placeholder="Pregunta"
                                    name="opciones"
                                  />
                                  <label
                                    htmlFor={`floatingInput-${ejercicio[0]}-${number}`}
                                  >
                                    Ingresa la opcion {number}
                                  </label>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                          <div className="form-floating">
                            <input
                              type="number"
                              min={1}
                              max={contadorPreguntas}
                              className="form-control"
                              id={`floatingPassword-${ejercicio[0]}`}
                              placeholder="Opciones"
                              name="respuesta"
                            />
                            <label htmlFor={`floatingPassword-${ejercicio[0]}`}>
                              Ingresa la opción correcta
                            </label>
                          </div>
                          <br />
                          <div className="col-auto">
                            <button
                              type="submit"
                              className="btn btn-primary mb-3"
                            >
                              Enviar
                            </button>
                          </div>
                        </form>
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

export default ReadingDoc;
