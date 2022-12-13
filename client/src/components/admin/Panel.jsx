import React, { useContext, useEffect, useState } from "react";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthContext from "../../context/auth/AuthProvider";

const MySwal = withReactContent(Swal);
const Panel = () => {

  const {user, setUser} = useContext(AuthContext);
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.getDocentes();
      console.log(res);
      if (res.data.status === 200) {
        setDocentes(res.data.data);
      } else {
        setDocentes([]);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Panel de administrador</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className=" text-primary">
                    <tr>
                      <th>Foto</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Email</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!docentes ? (
                      <tr>
                        <td colSpan="5">No hay docentes</td>
                      </tr>
                    ) : (
                      docentes.map((docente, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={`/public/uploads/${docente?.imgurlUsu}`}
                              alt="Foto de perfil"
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>{docente?.nombreUsu}</td>
                          <td>{docente?.apellidosUsu}</td>
                          <td>{docente?.correoUsu}</td>
                          <td>
                            <div className="row">
                              <div className="col-4">
                                <button
                                  className="btn btn-danger"
                                  title="Borrar docente"
                                  onClick={async () => {
                                    MySwal.fire({
                                      title: "¿Estas seguro?",
                                      text: "No podras revertir esta accion",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Si, borrar",
                                      timer: 5000,
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        MySwal.fire({
                                          title: "Confirmación",
                                          text: "Introduzca la contraseña del docente para poder borrar",
                                          input: "password",
                                          inputAttributes: {
                                            autocapitalize: "off",
                                          },
                                          showCancelButton: true,
                                          confirmButtonText: "Borrar",
                                          showLoaderOnConfirm: true,
                                        }).then(async (result) => {
                                          const res = await api.deleteDocente({
                                            id: docente?.idUsu,
                                            password: result.value,
                                          });
                                          if (res.data.status === 200) {
                                            MySwal.fire({
                                              title: "Borrado",
                                              text: "El docente ha sido borrado",
                                              icon: "success",
                                              timer: 5000,
                                            });
                                            setDocentes(
                                              docentes.filter(
                                                (doc) =>
                                                  doc.idUsu !== docente.idUsu
                                              )
                                            );
                                          } else {
                                            MySwal.fire({
                                              title: "Error",
                                              text: res.data.message,
                                              icon: "error",
                                              timer: 5000,
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className=" text-primary">
                    <tr>
                      <td colSpan={5} className="g-5">
                        <button
                          className="btn btn-primary mx-2"
                          title="Agregar docente"
                        >
                          Agregar docente
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          title="Cerrar sesion"
                          onClick={() => {
                            MySwal.fire({
                              title: "¿Estas seguro de cerrar sesion?",
                              showDenyButton: true,
                              confirmButtonText: `Si`,
                              denyButtonText: `No`,
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                const res = await api.logout();
                                setUser(null);
                                nav("/");
                                console.log(res);
                              }
                            });
                          }}
                        >
                          Cerrar sesión
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
