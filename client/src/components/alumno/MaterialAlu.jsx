import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { userAPI as api } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthContext from "../../context/auth/AuthProvider";

const MySwal = withReactContent(Swal);

const MaterialAlu = () => {
  const {code} = useContext(AuthContext)

  const nav = useNavigate();

  useEffect(() => {
    if (!code) {
      nav("/app");
    }
  }, [code]);

  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.getMaterialesAlu();
      console.log(res)
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
          Seccion de material
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
                        target="_blank"
                      >
                        {`#${index + 1}`}
                      </a>
                    </li>
                  ))}
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
              Aun no hay materiales para mostrar
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

export default MaterialAlu;
