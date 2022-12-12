import React, { useEffect, useState } from "react";
import { userAPI as api } from "../../API/userAPI";

const Panel = () => {
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
                      <td colSpan={5}>
                        <button
                          className="btn btn-primary"
                          title="Agregar docente"
                        >
                          Agregar docente
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
