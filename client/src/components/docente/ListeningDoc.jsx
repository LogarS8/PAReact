import React, { useState, useEffect } from "react";
import { NavLeft } from "../Ejercicios";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ListeningDoc = () => {
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
                {ejercicios.map((item, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <a
                      className="nav-link fw-bolder link-secondary"
                      role="tab"
                      data-bs-toggle="tab"
                      href={`#tab-${item[0]}`}
                    >
                      Lección Listening {item[0]}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className="tab-content"
                style={{ width: "80%!important", float: "right" }}
              >
                {ejercicios.map((item, index) => (
                  <div
                    className="tab-pane"
                    role="tabpanel"
                    id={`tab-${item[0]}`}
                    key={index}
                  >
                    <h2>Leccion Listening {item[0]}</h2>
                    <div className="mb-3">
                      <label htmlFor={`formFileSm-${item[0]}`} className="form-label">
                        Elige una audio
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id={`formFileSm-${item[0]}`}
                        type="file"
                      />
                    </div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue={""}
                    >
                      <option defaultValue={""}>
                        Elige de cuantas opciones es la pregunta
                      </option>
                      <option value="1">Una</option>
                      <option value="2">Dos</option>
                      <option value="3">Tres</option>
                      <option value="4">Cuatro</option>
                    </select>
                    <br />
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id={`floatingInput-${item[0]}`}
                        placeholder="Pregunta"
                      />
                      <label htmlFor={`floatingInput-${item[0]}`}>Ingresa la pregunta</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id={`floatingPassword-${item[0]}`}
                        placeholder="Opciones"
                      />
                      <label htmlFor={`floatingPassword-${item[0]}`}>
                        Ingresa las opciones
                      </label>
                    </div>
                    <br />
                    <div className="col-auto">
                      <button type="submit" className="btn btn-primary mb-3">
                        Enviar
                      </button>
                    </div>
                    <hr />
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            value="Pregunta solo es de lectura"
                          />
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckDefault-${item[0]}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckDefault-${item[0]}`}
                          >
                            Respuesta 1
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckChecked-${item[0]}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckChecked-${item[0]}`}
                          >
                            Respuesta 2
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckChecked2-${item[0]}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckChecked2-${item[0]}`}
                          >
                            Respuesta 3
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckChecked3-${item[0]}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckChecked3-${item[0]}`}
                          >
                            Respuesta 4
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
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary" type="button">
                        Agregar Leccion a los alumnos
                      </button>
                    </div>
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

export default ListeningDoc;
