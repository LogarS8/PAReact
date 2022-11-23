import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/AuthProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { userAPI as api } from "../../API/userAPI";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

const AlumnoSection = ({ data, setAlumnos }) => {
  return (
    <tr key={data.idUsu}>
      <td>{data.nombreUsu}</td>
      <td>Alumno</td>
      <td>CECyT 9</td>
      <td
        className="text-center align-middle"
        style={{ maxHeight: 60, height: 60 }}
      >
        <a
          className="btn btnMaterial btn-flat accent btnNoBorders checkboxHover"
          role="button"
          data-bss-tooltip=""
          style={{ marginLeft: 5 }}
          onClick={() => {
            MySwal.fire({
              title: "¿Estas seguro?",
              text: "No podras revertir esta accion",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Si, eliminar",
              cancelButtonText: "No, cancelar",
              reverseButtons: true,
            }).then(async (result) => {
              if (result.isConfirmed) {
                const res = await api.deleteStudent(data.idUsu);
                console.log(res);
                if (res.data.status === 200) {
                  MySwal.fire("Eliminado", res.data.message, "success");
                  setAlumnos((prev) => {
                    return prev.filter((item) => item.idUsu !== data.idUsu);
                  });
                } else {
                  MySwal.fire("Error", res.data.message, "error");
                }
              }
            });
          }}
          title="Eliminar"
        >
          <i
            className="fas fa-trash btnNoBorders"
            style={{ color: "#DC3545" }}
          ></i>
        </a>
      </td>
    </tr>
  );
};

const IndexBody = () => {
  const { user } = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchCode() {
      const code = await api.getCode();
      setCode(code.data.code);

      const students = await api.getStudentsByCode(code.data.code);
      console.log(students.data?.data);
      if (students.data?.data) {
        setAlumnos(students.data.data);
      } else {
        setMsg(students.data.message);
      }
    }
    fetchCode();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-4 ">
            <img src={`/public/uploads/${user.imgurlUsu}`} class="img-fluid rounded" alt="" height={30} width={30} />
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
                          showCancelButton: true,
                          confirmButtonText: "Copiar",
                          cancelButtonText: "Cerrar",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigator.clipboard.writeText(code);
                            MySwal.fire({
                              title: "Codigo copiado",
                              icon: "success",
                              timer: 1500,
                              showConfirmButton: false,
                            });
                          }
                          setCode(code);
                        });
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
                  {alumnos.length !== 0 ? "Alumnos inscritos en tu grupo" : msg}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {alumnos.length !== 0 ? (
                <div className="table-responsive">
                  <table
                    className="table table-striped table tablesorter"
                    id="ipi-table"
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Tipo</th>
                        <th className="text-center">Escuela</th>
                        <th className="text-center filter-false sorter-false">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {alumnos?.map((alumno) => (
                        <AlumnoSection data={alumno} setAlumnos={setAlumnos} />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexBody;
