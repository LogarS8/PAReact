import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI as api } from "../../API/userAPI";
import AuthContext from "../../context/auth/AuthProvider";
import Swal from "sweetalert2";
import withreactcontent from "sweetalert2-react-content";

const MySwal = withreactcontent(Swal);

const ActividadesDoc = () => {
  const { code } = useContext(AuthContext);

  const nav = useNavigate();

  useEffect(() => {
    if (!code) {
      nav("/app");
    }
  }, [code]);

  const [alumnos, setAlumnos] = useState([]);
  const [selected, setSelected] = useState(0);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    async function fetchAlumnos() {
      const res = await api.getAlumnos();
      console.log(res);
      if (res.data.status === 200) {
        setAlumnos(res.data.alumnos);
        setSelected(res.data.alumnos[0].idUsu);
      }
    }
    fetchAlumnos();
  }, []);

  useEffect(() => {
    async function fetchActividades() {
      const res = await api.getActividades(selected);
      console.log(res);
      if (res.data.status === 200) {
        setActividades(res.data.data);
      } else {
        setActividades([]);
      }
    }
    fetchActividades();
  }, [selected]);

  return (
    <div>
      <div className="container-fluid" style={{ paddingTop: 26 }}>
        <div className="row">
          <div className="col-12" style={{ marginBottom: 20 }}>
            <div className="card"></div>
          </div>
        </div>
        <div className="card" id="TableSorterCard">
          <div className="card-header py-3">
            <div className="row table-topper align-items-center">
              <div
                className="col-12 col-sm-5 col-md-6 text-start"
                style={{ margin: 0, padding: [5, 15] }}
              >
                <div className="select">
                  <select
                    onChange={(v) => {
                      setSelected(v.target.value);
                    }}
                    className="form-select"
                  >
                    <optgroup label="Elige a un alumno">
                      {alumnos.map((alumno) => {
                        return (
                          <option value={alumno.idUsu}>
                            {alumno.nombreUsu}
                          </option>
                        );
                      })}
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <p className="text-primary m-0 fw-bold">
                  ACTIVIDADES POR ALUMNO
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row">
                {selected === 0 ? (
                  <h4 className="text-primary m-0 fw-bold">
                    SELECCIONE UN ALUMNO
                  </h4>
                ) : (
                  <>
                    {actividades.length === 0 ? (
                      <h4 className="text-primary m-0 fw-bold">
                        NO HAY ACTIVIDADES
                      </h4>
                    ) : null}
                    {actividades.length > 0 ? (
                      <>
                        {actividades.map((actividad, index) => (
                          <>
                            <div className="col-md-6 col-xl-3 mb-4" key={index}>
                              <div className="card shadow border-start-primary py-2">
                                <div
                                  className="card-body"
                                  style={{ paddingBottom: 0, paddingTop: 0 }}
                                >
                                  <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                      <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                        <span
                                          style={{
                                            fontSize: 12,
                                            color: "var(--bs-primary)",
                                          }}
                                        >
                                          Actividad:{" "}
                                          {actividad?.tipoAct +
                                            " " +
                                            actividad?.numeroAct}
                                        </span>
                                      </div>
                                      <div
                                        className="text-dark fw-bold h5 mb-0"
                                        style={{ marginTop: -6 }}
                                      >
                                        <span style={{ fontSize: 14 }}>
                                          Respuesta del alumno:{" "}
                                          {actividad?.respuestaAct.endsWith(
                                            ".pdf"
                                          ) ? (
                                            <a
                                              href={`../public/uploads/${actividad?.respuestaAct}`}
                                            >
                                              <i
                                                className="fas fa-file-pdf"
                                                style={{
                                                  color: "var(--bs-red)",
                                                  fontSize: 20,
                                                }}
                                              ></i>
                                            </a>
                                          ) : (
                                            actividad?.respuestaAct
                                          )}
                                        </span>
                                        <span
                                          style={{
                                            fontSize: 10,
                                            marginLeft: 12,
                                            color: "var(--bs-gray-600)",
                                          }}
                                        >
                                          {actividad?.califAct}/10
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-auto">
                                      <i
                                        className="fas fa-medal fa-2x"
                                        data-bs-toggle="tooltip"
                                        data-bss-tooltip=""
                                        style={{
                                          color:
                                            actividad?.califAct >= 9
                                              ? "var(--bs-blue)"
                                              : actividad?.califAct >= 7
                                              ? "var(--bs-green)"
                                              : actividad?.califAct >= 5
                                              ? "var(--bs-yellow)"
                                              : actividad?.califAct >= 3
                                              ? "var(--bs-orange)"
                                              : actividad?.califAct >= 1
                                              ? "var(--bs-red)"
                                              : "var(--bs-gray-600)",
                                          fontSize: 28,
                                          marginTop: 4,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          MySwal.fire({
                                            title:
                                              "Introduzca la calificación de 0 a 10",
                                            showCancelButton: true,
                                            confirmButtonText: "Enviar",
                                            cancelButtonText: "Cancelar",
                                            input: "text",
                                            inputPlaceholder: "0/10",
                                            inputAttributes: {
                                              autocapitalize: "off",
                                              min: 0,
                                              max: 10,
                                            },
                                          }).then(async (res) => {
                                            if (res.value > 10 || res.value < 0)
                                              return MySwal.fire(
                                                "Error",
                                                "La calificación debe ser entre 0 y 10",
                                                "error"
                                              );
                                            if (!res.value)
                                              return MySwal.fire(
                                                "Error",
                                                "Debe introducir una calificación",
                                                "error"
                                              );
                                            if (isNaN(res.value))
                                              return MySwal.fire(
                                                "Error",
                                                "La calificación debe ser un número",
                                                "error"
                                              );
                                            const { value } = res;
                                            const response =
                                              await api.setCalificacion({
                                                idAct: actividad.idAct,
                                                calificacion: value,
                                              });
                                            if (response.status === 200) {
                                              MySwal.fire(
                                                "Éxito",
                                                "Calificación asignada",
                                                "success"
                                              );
                                              const res =
                                                await api.getActividades(
                                                  selected
                                                );
                                              setActividades(res.data.data);
                                            } else {
                                              MySwal.fire(
                                                "Error",
                                                "Ocurrió un error",
                                                "error"
                                              );
                                            }
                                          });
                                        }}
                                        title="Asignar medalla"
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActividadesDoc;
