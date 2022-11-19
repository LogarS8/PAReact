import React, { useState } from "react";
import { Footer, Header } from "../components/IndexModules";
import { userAPI as api } from "../API/userAPI";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const validate = (data) => {
    if (data.email === "" || data.password === "") {
      alert("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  return (
    <div>
      <Header />

      <div
        className="d-flex  flex-column justify-content-center align-items-center "
        id="login-box"
      >
        <div className="login-box-header">
          <h4
            style={{
              color: "rgb(139,139,139)",
              marginBottom: 0,
              fontWeight: 400,
              fontSize: 27,
            }}
          >
            Iniciar Sesion
          </h4>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if(validate(user)){
              const res = await api.login(user)
              console.log(res);
              if(res.status === 200){
                MySwal.fire({
                  title: "Bienvenido",
                  text: "Iniciaste sesion correctamente",
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
                  window.location.href = "/";
                });
              }else{
                MySwal.fire({
                  title: "Error",
                  text: res.message,
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            }
          }}
        >
          <div className="email-login" style={{ backgroundColor: "#ffffff" }}>
            <input
              type="email"
              className="email-imput form-control my-2"
              style={{ marginTop: 10 }}
              required=""
              placeholder="Correo"
              minLength="10"
              autoComplete="on"
              maxLength="35"
              onChange={(e) => {
                e.preventDefault();
                setUser({ ...user, email: e.target.value });
              }}
            />
            <input
              type="password"
              className="password-input form-control my-2"
              style={{ marginTop: 10 }}
              required=""
              placeholder="Contraseña"
              minLength="10"
              autoComplete="on"
              maxLength="20"
              onChange={(e) => {
                e.preventDefault();
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <div
            className="submit-row"
            style={{ marginBottom: 8, paddingTop: 0 }}
          >
            <button
              className="btn btn-primary d-block box-shadow w-100"
              role="button"
              id="submit-id-submit"
              type="submit"
            >
              Acceder
            </button>
            <div className="d-flex justify-content-between">
              <div
                className="form-check form-switch form-check-inline"
                id="form-check-rememberMe"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="formCheck-1"
                  htmlFor="remember"
                  style={{ cursor: "pointer" }}
                  name="check"
                  value={user.remember}
                  onChange={(e) => {
                    setUser((prev)=>{
                      return {...prev, remember: !prev.remember}
                    });
                  }}

                />
                <label className="form-check-label" htmlFor="formCheck-1">
                  <span className="label-text">Recuerdame</span>
                </label>
              </div>
              <a id="forgot-password-link" href="#">
                Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </form>
        <div
          id="login-box-footer"
          style={{ padding: "10px 20px", paddingBottom: 23, paddingTop: 18 }}
        >
          <p style={{ marginBottom: 0 }}>
            No tienes una cuenta?
            <Link id="register-link" to="/signin">
              Registrate!
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
