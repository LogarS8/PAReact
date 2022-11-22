import React, { useState, useEffect } from "react";
import { NavLeft } from "../Ejercicios";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const WritingDoc = () => {
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

  useEffect(()=>{
    async function fetchData(){
      try{
        const res = await api.getLeccionesWriting();
        console.log(res.data);
        if(res.data.status === 200){
          res.data.data.forEach((e) => {
            setEjercicios((prev) => {
              const newEjercicios = [...prev];
              newEjercicios[e.numeroLec - 1][1] = e;
              return newEjercicios;
            });
          });
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, [])

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
                      <>
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
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={async () => {
                              const res = await api.deleteLeccionWriting(
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
                      </>
                    ) : (
                      <>
                        <h2>Leccion {item[0]}</h2>
                        <form
                          action="/api/v1/lecciones/crearLeccionWriting"
                          method="POST"
                          encType="multipart/form-data"
                        >
                          <input
                            type={"hidden"}
                            value={item[0]}
                            name="numero"
                          />
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="Pregunta"
                              name="data"
                            />
                            <label htmlFor="floatingInput">
                              Ingresa las instrucciones de la asignacion
                            </label>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="formFileSm" className="form-label">
                              <h2>Elige el archivo correspondiente</h2>
                            </label>
                            <input
                              className="form-control form-control-sm"
                              id="formFileSm"
                              type="file"
                              name="fileImg"
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

export default WritingDoc;
