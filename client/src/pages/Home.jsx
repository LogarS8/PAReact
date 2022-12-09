import React from "react";
import { Header, Footer } from "../components/IndexModules";
import { Link } from "react-router-dom";
import swal from 'sweetalert2';


const Home = () => {

  return (
    <div>
      <Header />

      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="bg-dark border rounded border-0 border-dark overflow-hidden">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="text-white p-4 p-md-5">
                  <h2 className="fw-bold text-white mb-3">
                    Bienvenido a&nbsp;
                    <br />
                    Break&amp;Learn
                  </h2>
                  <p className="mb-4">
                    Una aplicación especializada en el aprendizaje del idioma
                    ingles en el cual puedes confiar y aprender por tu propia
                    cuenta
                  </p>
                  <div className="my-3">
                    <Link
                      className="btn btn-primary btn-lg me-2"
                      to="/signin"
                      role="button"
                      style={{cursor: "pointer"}}
                    >
                      ¡Registrarse!
                    </Link>
                    <Link
                      className="btn btn-light btn-lg"
                      
                      to="/login"
                      style={{cursor: "pointer"}}
                    >
                      Iniciar Sesion
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 order-first order-md-last"
                style={{ minHeight: 250 }}
              >
                <img
                  className="w-100 h-100 fit-cover"
                  src="https://t4.ftcdn.net/jpg/01/91/40/69/360_F_191406979_U8KHcV8ecFi2TROOMGtcU6dt70ypHyYc.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
