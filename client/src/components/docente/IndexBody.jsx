import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/AuthProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { userAPI as api } from "../../API/userAPI";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

const IndexBody = () => {
  const { user } = useContext(AuthContext);

  const [code, setCode] = useState("");

  useEffect(() => {
    async function fetchCode() {
      const data = await api.getCode();
      setCode(data.data.code);
    }
    fetchCode();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-4 ">
            <h3 className="text-dark mb-4">Bienvenido, {user?.lastName}</h3>
          </div>
          <div className="col-2 text-end" style={{ marginBottom: 30 }}>
            {code ? (
              `Codigo de clase: ${code}`
            ) : (
              <a
                className="btn btn-primary"
                role="button"
                style={{ marginLeft: -292 }}
                onClick={() => {
                  MySwal.fire({
                    title: "Generar nuevo codigo",
                    text: "¿Estas seguro de generar un nuevo codigo?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      const res = await api.genCode();
                      if (res.data.status === 200) {
                        const { code } = res.data;
                        MySwal.fire({
                          title: "Codigo generado",
                          text: `Tu nuevo codigo es: ${code}`,
                          icon: "success",
                          confirmButtonText: "Ok",
                        });
                        setCode(code);
                      } else {
                        MySwal.fire({
                          title: "Error",
                          text: res.data.message,
                          icon: "error",
                          confirmButtonText: "Ok",
                        });
                      }
                    }
                  });
                }}
              >
                <i className="fa fa-plus"></i>&nbsp;Crear código
              </a>
            )}
          </div>
          <div className="col-6">
            <div className="form-group pull-right col-lg-6">
              <input
                type="text"
                className="search form-control"
                placeholder="Buscar alumno"
              />
            </div>
          </div>
        </div>
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
                <p className="text-primary m-0 fw-bold">
                  Alumnos inscritos en tu grupo
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table
                  className="table table-striped table tablesorter"
                  id="ipi-table"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Estado</th>
                      <th className="text-center">TIPO</th>
                      <th className="text-center">Escuela</th>
                      <th className="text-center filter-false sorter-false">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>Rodrigo</td>
                      <td>
                        <p
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="Inscrito"
                        >
                          <i className="fas fa-check text-info"></i>
                        </p>
                        <p
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="No ha sido atendido"
                        ></p>
                        <p
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="Requiere validación"
                        ></p>
                      </td>
                      <td>Alumno</td>
                      <td>CECyT 9</td>
                      <td
                        className="text-center align-middle"
                        style={{ maxHeight: 60, height: 60 }}
                      >
                        <a
                          className="btn btnMaterial btn-flat primary semicircle"
                          role="button"
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          href="show.html"
                          title="Ver detalles"
                        >
                          <i className="far fa-eye"></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat success semicircle"
                          role="button"
                          href="send-document.html"
                        >
                          <i
                            className="fas fa-arrows-alt"
                            data-bs-toggle="tooltip"
                            data-bss-tooltip=""
                            title="Mover"
                          ></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat success semicircle"
                          role="button"
                          href="create-document.html"
                        >
                          <i
                            className="fas fa-pen"
                            data-bs-toggle="tooltip"
                            data-bss-tooltip=""
                            title="Editar"
                          ></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat accent btnNoBorders checkboxHover"
                          role="button"
                          data-bs-toggle="modal"
                          data-bss-tooltip=""
                          style={{ marginLeft: 5 }}
                          data-bs-target="#delete-modal"
                          href="#"
                          title="Eliminar"
                        >
                          <i
                            className="fas fa-trash btnNoBorders"
                            style={{ color: "#DC3545" }}
                          ></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Joshua
                        <br />
                      </td>
                      <td>
                        <p
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="Inscrito"
                        >
                          <i className="fas fa-check text-info"></i>
                        </p>
                        <p
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="No ha sido atendido"
                        ></p>
                        <p
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="Requiere validación"
                        ></p>
                      </td>
                      <td>Alumno</td>
                      <td>CECyT 9</td>
                      <td
                        className="text-center align-middle"
                        style={{ maxHeight: 60, height: 60 }}
                      >
                        <a
                          className="btn btnMaterial btn-flat primary semicircle"
                          role="button"
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          href="show.html"
                          title="Ver detalles"
                        >
                          <i className="far fa-eye"></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat success semicircle"
                          role="button"
                          href="send-document.html"
                          title="Turnar"
                        >
                          <i
                            className="fas fa-arrows-alt"
                            data-bs-toggle="tooltip"
                            data-bss-tooltip=""
                            title="Mover"
                          ></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat success semicircle"
                          role="button"
                          href="create-document.html"
                        >
                          <i
                            className="fas fa-pen"
                            data-bs-toggle="tooltip"
                            data-bss-tooltip=""
                            title="Editar"
                          ></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat success semicircle"
                          role="button"
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="Eliminar"
                        >
                          <i
                            className="fas fa-trash btnNoBorders"
                            style={{ color: "#DC3545" }}
                          ></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexBody;
