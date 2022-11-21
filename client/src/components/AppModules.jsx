import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthProvider";
import { userAPI as api } from "../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Header = ({ rol }) => {
  const nav = useNavigate();
  const { setUser } = useContext(AuthContext);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const linkClick = () => {
    ref1.current.classList.add("collapsed");
    ref2.current.classList.remove("show");
  };
  return (
    <header>
      <nav
        className="navbar navbar-dark fixed-top bg-dark"
        style={{ paddingBottom: 7 }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Break&amp;Learn
          </Link>
          <button
            ref={ref1}
            data-bs-toggle="collapse"
            className="navbar-toggler collapsed"
            data-bs-target="#navcol-1"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center"
            id="navcol-1"
            ref={ref2}
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/app" onClick={linkClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/app/material"
                  onClick={linkClick}
                >
                  Material
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/app/ejercicios"
                  onClick={linkClick}
                >
                  Ejercicios
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  Opciones
                </a>
                <div className="dropdown-menu">
                  {rol === "docente" ? (
                    <Link
                      className="dropdown-item"
                      to="/app/actividades"
                      onClick={linkClick}
                    >
                      Actividades
                    </Link>
                  ) : null}
                  <Link
                    className="dropdown-item"
                    to="/app/editar"
                    onClick={linkClick}
                  >
                    Editar cuenta
                  </Link>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      linkClick();
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
                    Cerrar sesión&nbsp;
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
