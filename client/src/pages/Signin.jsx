import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components/IndexModules";
import { userAPI } from "../../API/userAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Signin = () => {
  const nav = useNavigate();

  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState(undefined);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const validate = (data) => {
    //regex to verify only letters, spaces, numbers and some special characters
    const regex = /^[a-zA-Z0-9\s\-\_\.\,]+$/;

    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === "" ||
      !data.image
    ) {
      alert("Todos los campos son obligatorios");
      return false;
    }
    if (!regex.test(data.firstName) || !regex.test(data.lastName)) {
      alert(
        "El nombre y apellido solo pueden contener letras, numeros, espacios y algunos caracteres especiales"
      );
      return false;
    }
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return false;
    }
    if (data.password < 10 || data.password > 20) {
      alert("La contraseña debe tener entre 10 y 20 caracteres");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(undefined);
    }
  }, [image]);

  return (
    <div>
      <Header />

      <div
        className="container-xl border rounded-0 border-1 border-dark profile profile-view"
        id="profile"
        style={{ paddingTop: 0, marginTop: 48 }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (validate(user)) {
              const res = await userAPI.register(user);
              if (res?.status === 200) {
                MySwal.fire({
                  title: "Registro exitoso",
                  text: res.message,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
                  nav("/login");
                });
              } else {
                MySwal.fire({
                  title: "Error :(",
                  text: res.message,
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            }
          }}
        >
          <div className="row profile-row">
            <div className="col-md-4 m-auto relative">
              <div className="avatar">
                <div className="avatar-bg center">
                  <img
                    id="blah"
                    style={{
                      width: 300,
                      height: 300,
                      margin: 25,
                      borderRadius: "50%",
                    }}
                    src={preview ? preview : "https://via.placeholder.com/300"}
                    alt="Tu imagen"
                  />
                </div>
              </div>
              <input
                className="form-control form-control"
                type="file"
                name="avatarFile"
                accept="image/jpeg, image/png"
                required
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (
                      file.type === "image/jpeg" ||
                      file.type === "image/png"
                    ) {
                      setImage(file);
                      setUser({
                        ...user,
                        image: file.name,
                      });
                    } else {
                      alert("Solo se permiten imagenes en formato .jpg o .png");
                      setImage(undefined);
                      e.target.value = "";
                    }
                  } else {
                    setImage(undefined);
                  }
                }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="font-monospace fs-1 border rounded-0">
                Registrate!
              </h1>
              <hr />
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      className="form-control"
                      type="text"
                      data-aos="flip-down"
                      name="firstname"
                      placeholder="Escribe tu nombre "
                      autoComplete="on"
                      minLength="5"
                      maxLength="30"
                      required
                      onChange={(e) => {
                        e.preventDefault();
                        setUser({ ...user, firstName: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                      className="form-control visible"
                      type="text"
                      data-aos="flip-down"
                      name="lastname"
                      autoComplete="on"
                      placeholder="Escribe tu apellido"
                      required=""
                      minLength="5"
                      maxLength="30"
                      onChange={(e) => {
                        e.preventDefault();
                        setUser({ ...user, lastName: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Email </label>
                <input
                  className="form-control"
                  type="email"
                  data-aos="flip-down"
                  autoComplete="on"
                  required=""
                  name="email"
                  placeholder="Escribe tu correo"
                  minLength="10"
                  maxLength="35"
                  onChange={(e) => {
                    e.preventDefault();
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      className="form-control"
                      type="password"
                      data-aos="flip-down"
                      name="password"
                      autoComplete="off"
                      required=""
                      placeholder="Escribe tu contraseña"
                      minLength="10"
                      maxLength="20"
                      onChange={(e) => {
                        e.preventDefault();
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">
                      Confirmación Contraseña&nbsp;
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      data-aos="flip-down"
                      name="confirmpass"
                      autoComplete="on"
                      placeholder="Confirma tu contraseña"
                      minLength="10"
                      maxLength="20"
                      required=""
                      onChange={(e) => {
                        e.preventDefault();
                        setUser({ ...user, confirmPassword: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className=" d-flex justify-content-evenly mb-3">
                <button className="btn btn-primary form-btn" type="submit">
                  Registrarse
                </button>
                <button
                  className="btn btn-danger form-btn"
                  onClick={() => nav("/")}
                >
                  Cancelar
                </button>
                <div>
                  ¿Ya tienes una cuenta?&nbsp;&nbsp;
                  <Link
                    className="btn btn-outline-primary form-btn"
                    role="button"
                    to="/login"
                  >
                    Ya la tengo!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Signin;
