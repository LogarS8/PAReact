import React, { useState, useEffect } from "react";
import { NavLeft } from "../Ejercicios";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const WritingAlu = () => {
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
        const res = await api.getWritingAlu();
        console.log("getleccionesWriting");
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
        const res2 = await api.getWritingActivity();
        console.log("getwritingActivity");
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
                style={{ width: "25%!important", float: "left" }}
              >
                {ejercicios.map((item, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <a
                      className="nav-link fw-bolder link-secondary"
                      role="tab"
                      data-bs-toggle="tab"
                      href={`#tab-${item[0]}`}
                    >
                      Lección Writing {item[0]}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className="tab-content"
                style={{ width: "75%!important", float: "right" }}
              >
                {ejercicios.map((item, index) => (
                  <div
                    className="tab-pane"
                    role="tabpanel"
                    id={`tab-${item[0]}`}
                    key={index}
                  >
                    {item[1].idLec ? (
                      <div className="card mb-3">
                        <img
                          src={`../../public/uploads/${item[1].urlLec}`}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">Lección {item[0]}</h5>
                          <hr />
                          <p className="card-text">{item[1].respuestaLec}</p>
                        </div>
                        <form
                          action="/api/v1/actividades/createWritingActivity"
                          method="POST"
                        >
                          <input
                            type="hidden"
                            name="numeroLec"
                            value={item[1].numeroLec}
                          />
                          <h5 className="card-title">Introduce la respuesta</h5>
                          <input
                            type="text"
                            className="form-control"
                            id={`inputPassword3-${item[0]}`}
                            name="respuesta"
                          />
                          <br />
                          <hr />
                          <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit">
                              Enviar respuesta
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                    {!item[1].idLec && item[1]?.state !== "done" ? (
                      <h4>
                        Esperando a que el profesor suba la lección Writing
                      </h4>
                    ) : null}
                    {item[1].state === "done" ? (
                      <h4>Ya has contestado esta lección</h4>
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

export default WritingAlu;
