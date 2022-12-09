import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/AuthProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { userAPI as api } from "../../API/userAPI";

const MySwal = withReactContent(Swal);

const IndexBody = () => {
  const { user, code, setCode } = useContext(AuthContext);

  const [alumnos, setAlumnos] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchCode() {
      const code = await api.getStudentCode();
      setCode(code.data.code);

      // const students = await api.getStudentsByCode(code.data.code);
      // console.log(students.data?.data);
      // if (students.data?.data) {
      //   setAlumnos(students.data.data);
      // } else {
      //   setMsg(students.data.message);
      // }
    }
    fetchCode();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 my-2">
          <img src={`/public/uploads/${user?.image}`} class="img-fluid rounded" alt="" height={100} width={100} />
            <h3 className="text-dark my-4">Bienvenido {user?.lastName}</h3>
            <div className="col-md-12 search-table-col">
              <div className="form-group pull-right col-lg-4">
                <input
                  type="text"
                  className="search form-control"
                  placeholder="Buscar actividad"
                />
              </div>
              <span className="counter pull-right"></span>
            </div>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 text-end my-4"
            style={{ marginBottom: 30 }}
          >
            {code ? (
              `Codigo de clase: ${code}`
            ) : (
              <a
                className="btn btn-primary"
                role="button"
                style={{ marginLeft: -292 }}
                onClick={() => {
                  MySwal.fire({
                    title: "Establecer codigo de clase",
                    showCancelButton: true,
                    confirmButtonText: "Generar",
                    cancelButtonText: "Cancelar",
                    type: "input",
                    input: "text",
                    inputPlaceholder: "Codigo de clase",
                  }).then(async (result) => {
                    if (result.value) {
                      const res = await api.setStudentCode(result.value);
                      console.log(res);
                      if (res.data.status === 200) {
                        MySwal.fire({
                          title: res.data.message,
                          text: `Codigo de clase: ${result.value}`,
                          icon: "success",
                        });
                        setCode(result.value);
                      } else {
                        MySwal.fire({
                          title: "Error",
                          text: res.data.message,
                          icon: "error",
                        });
                      }
                    }
                  });
                }}
              >
                <i className="fa fa-plus"></i>&nbsp;Ingresa codigo
              </a>
            )}
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
                  Actividades realizadas&nbsp;
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
                      <th className="text-center">Actividad</th>
                      <th className="text-center">Estado</th>
                      <th className="text-center">TIPO</th>
                      <th className="text-center filter-false sorter-false">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>Ejemplo</td>
                      <td>
                        <p
                          data-bs-toggle="tooltip"
                          data-bss-tooltip=""
                          title="Completado"
                        >
                          <i className="fas fa-check text-info"></i>
                        </p>
                      </td>
                      <td>Writing</td>
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
                    <tr></tr>
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
