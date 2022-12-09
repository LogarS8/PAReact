import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI as api } from "../../API/userAPI";
import AuthContext from "../../context/auth/AuthProvider";

const ActividadesDoc = () => {
  const {code} = useContext(AuthContext)

  const nav = useNavigate();

  useEffect(() => {
    if (!code) {
      nav("/app");
    }
  }, [code]);

  useEffect(()=>{
    async function fetchAlumnos() {
      const res = await api.getAlumnos()
      console.log(res)
    }
    fetchAlumnos()
  })

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
                  <select>
                    <optgroup label="Elige a un alumno">
                      <option value="12" selected="">
                        Rodrigo
                      </option>
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
                <div className="col-md-6 col-xl-3 mb-4">
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
                              actividad 1
                            </span>
                          </div>
                          <div
                            className="text-dark fw-bold h5 mb-0"
                            style={{ marginTop: -6 }}
                          >
                            <span style={{ fontSize: 14 }}></span>
                            <span style={{ fontSize: 14 }}>Incompleto</span>
                            <span
                              style={{
                                fontSize: 10,
                                marginLeft: 12,
                                color: "var(--bs-gray-600)",
                              }}
                            >
                              0/10
                            </span>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i
                            className="fas fa-medal fa-2x"
                            data-bs-toggle="tooltip"
                            data-bss-tooltip=""
                            style={{
                              color: "var(--bs-yellow)",
                              fontSize: 28,
                              marginTop: 4,
                            }}
                            title="Asignar medalla"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActividadesDoc;
