import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthProvider";
import { apiEndPoint, userAPI as api, userAPI } from "../API/userAPI";
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
          <Link className="navbar-brand" to="/app">
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

export const EditCuenta = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userAPI.checkSession();
        console.log(res);
        if (res.data.status === 200) {
          setUser(res.data.user);
        } else {
          nav("/login", {
            state: {
              message: "Debes iniciar sesion para acceder a esta pagina",
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (!user) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log("--------------------");
    console.log(user);
    console.log("--------------------");
    if (user?.rol === "admin") {
      nav("/app");
    }
  }, [user]);

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Editar cuenta</h4>
            </div>
            <div className="card-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const info = new FormData(e.target);
                  console.log(info);
                  const res = await api.editarCuenta(info);
                  console.log(res);
                  if (res.data.status === 200) {
                    MySwal.fire({
                      icon: "success",
                      title: "Cuenta editada correctamente",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then(() => {
                      setUser(res.data.user);
                      nav("/app");
                    });
                  } else {
                    MySwal.fire({
                      icon: "error",
                      title: "Error al editar cuenta",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                }}
              >
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="firstname"
                        minLength="5"
                        maxLength="30"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                        name="lastname"
                        minLength="5"
                        maxLength="30"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        autoComplete="on"
                        minLength="10"
                        maxLength="35"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        required
                        minLength={10}
                        maxLength={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Confirmar contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirmar contraseña"
                        name="confirmpass"
                        required
                        minLength={10}
                        maxLength={20}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Foto de perfil</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Foto de perfil"
                        name="fileImg"
                        required
                        accept="image/jpeg, image/png"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-info btn-fill pull-right"
                >
                  Editar
                </button>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
