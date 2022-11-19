import React from "react";
import { Header, Footer } from "../components/IndexModules";
import { Link } from "react-router-dom";


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
                      role="button"
                      target="_parent"
                      to="/login"
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
                  src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
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
