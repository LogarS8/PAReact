import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthContext from "../../context/auth/AuthProvider";

const MySwal = withReactContent(Swal);

const MaterialDoc = () => {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.getMateriales();
      if(res.data.status===200){
        setMateriales(res.data.data);
      }else{
        setMateriales([])
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <nav id="navbar-example2" className="navbar navbar-dark bg-dark px-3">
        <a className="navbar-brand" href="#">
          Seccion de material para el alumno
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              Elegir
            </a>
            <ul className="dropdown-menu">
              {materiales?.length === 0
                ? null
                : materiales.map((material, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        href={`#scrollspyHeading${index + 1}`}
                      >
                        {`#${index + 1}`}
                      </a>
                    </li>
                  ))}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={"/app/material/nuevoMaterial"}
                >
                  Agregar
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        className="scrollspy-example"
        tabIndex="0"
      >
        {materiales?.length === 0 ? (
          <div className="container">
            <div className="row">
              <Link className="btn btn-info" to={"/app/material/nuevoMaterial"}>
                Agrega un material para comenzar
              </Link>
            </div>
          </div>
        ) : (
          materiales.map((material, index) => (
            <>
              <br />
              <div className="container" id={`scrollspyHeading${index + 1}`}>
                <h3>{`#${index + 1}`}</h3>
                <div className="row">
                  <h5>{material.nombreMat}</h5>
                  <p>{material.textoMat}</p>
                  {material.fileMat ? (
                    <div className="d-grip gap-2">
                      <a href={`../public/uploads/${material.fileMat}`}>
                        Archivo PDF adjunto {material.fileMat}
                      </a>
                    </div>
                  ) : null}
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        MySwal.fire({
                          title: "¿Estas seguro?",
                          text: "No podras revertir esta accion",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Si, eliminar",
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            const res = await api.deleteMaterial(
                              material.idMat
                            );
                            if (res.data.status === 200) {
                              MySwal.fire(
                                "Eliminado!",
                                res.data.message,
                                "success"
                              ).then(() => {
                                window.location.reload();
                              });
                            } else {
                              MySwal.fire("Error!", res.data.message, "error");
                            }
                          }
                        });
                      }}
                    >
                      Borrar material
                    </button>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

const FormMaterial = () => {
  const nav = useNavigate();
  return (
    <div>
      <div className="container">
        <h3>Crear nuevo material</h3>
        <div className="row">
          <div className="col-md-">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const data = new FormData(form);

                const res = await api.createMaterial(data);
                console.log(res);
                if (res.data.status === 200) {
                  MySwal.fire({
                    title: "Material creado",
                    icon: "success",
                    confirmButtonText: "Ok",
                    text: res.data.message,
                    timer: 2000,
                  }).then(() => {
                    nav("/app/material");
                  });
                } else {
                  MySwal.fire({
                    title: "Error",
                    icon: "error",
                    confirmButtonText: "Ok",
                    text: res.data.message,
                    timer: 2000,
                  });
                }
              }}
            >
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Nombre del material
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="nombre"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Texto del material
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  name="texto"
                ></textarea>
              </div>
              <div className="mb-3">
                <label for="formFile" class="form-label">
                  Subir material (PDF) (opcional)
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  name="fileImg"
                />
              </div>
              <div className="d-grid gap-2 col-3">
                <button className="btn btn-primary" type="submit">
                  Crear material
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialRoutes = () => {

  const {code} = useContext(AuthContext)

  const nav = useNavigate();

  useEffect(() => {
    if (!code) {
      nav("/app");
    }
  }, [code]);


  return (
    <>
      <Routes>
        <Route path="/" element={<MaterialDoc />} />
        <Route path="/nuevoMaterial" element={<FormMaterial />} />
      </Routes>
    </>
  );
};

export default MaterialRoutes;
