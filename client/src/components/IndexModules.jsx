import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Header = () => {
  const MySwal = withReactContent(swal);
  const nav = useNavigate();
  return (
    <section className="py-4 py-xl-5">
      <div
        className="navbar navbar-dark navbar-expand-md bg-dark py-3"
        style={{
          paddingTop: 16,
          paddingBottom: 0,
          marginBottom: -8,
          marginTop: -48,
        }}
      >
        <div className="container ">
          <a
            className="navbar-brand d-flex align-items-center "
            style={{ cursor: "pointer" }}
            onClick={() => nav("/")}
          >
            <span className="bs-icon-sm bg-primary p-1 rounded bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-bezier "
              >
                <path
                  fillRule="evenodd"
                  d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                ></path>
                <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
              </svg>
            </span>
            <span>B&amp;L</span>
          </a>
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-5"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-5">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => (
                    MySwal.fire({
                      title: '¿Quieres conocernos?',
                      html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7524.006540642495!2d-99.1797005256896!3d19.455425813738795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdffeaf6b0a85d%3A0xb6ad4ff925a0d906!2sCentro%20Estudios%20Cient%C3%ADficos%20y%20Tecnol%C3%B3gicos%20(CECyT%209)%20%22Juan%20de%20Dios%20B%C3%A1tiz%22!5e0!3m2!1ses!2smx!4v1670541720194!5m2!1ses!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                    })
                  )}
                  style={{ cursor: "pointer" }}
                >
                  Donde estamos
                </a>
              </li>
              <li className="nav-item"></li>
            </ul>
            <a
              className="btn btn-primary ms-md-2"
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => (
                MySwal.fire({
                  title: '¿Que ofrecemos?',
                  text: 'Se solicita la realización de un sistema que sea capaz de gestionar material, ejercicios y recursos de apoyo al aprendizaje del idioma inglés, la necesidad de la realización del proyecto surge debido a la deficiencia de la enseñanza de este idioma en el nivel secundaria publica, lo cual resulta de suma importancia para mantener su constante desarrollo a nivel medio superior considerando que es uno de los idiomas más importantes y que se utiliza para la búsqueda de mejores empleos. '+
                              'Por ello se busca mejorar la enseñanza en este ámbito para elevar los niveles de conocimientos en el idioma inglés y que no resulte pesado en los niveles posteriores'
                })
              )}
            >
              ¿Que ofrecemos?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {

  const MySwal = withReactContent(swal);

  return (
    <footer className="text-center bg-dark" style={{marginTop: 62}}>
        <div className="container text-white py-4 py-lg-5" style={{paddingTop: 0,marginTop: 18}}>
            <ul className="list-inline">
                <li className="list-inline-item me-4">
                  <a 
                  className="link-light" 
                  style={{cursor:"pointer"}} 
                  onClick={()=>{
                    MySwal.fire({
                      title: 'AVISO DE PRIVACIDAD',
                      text: 'Una de las cosas que más no interesan de los usuarios es que se encuentren cómodos con Break & English, que no se sientan vigilados y lo más importante que se sientan seguros y con toda la confianza de seguir aprendiendo y mejorando su inglés, por esto necesitamos algunos datos para contar con ese grado de privacidad por lo que por el momento se van a integrar 2 punto de datos y por el momento se viendo si se integra otro punto de datos como lo son los “datos académicos” por el momento vamos a ver los puntos que se tienen por el momento. Para tener acceso a nuestro servicio, es necesario recopilar información, la cual nos proporcionaras directamente.'+ 
                      'Tu nombre de usuario'+                      
                      'Tu correo electrónico'+                       
                      'Tu edad'+                      
                      'Tu contraseña'+                     
                      'Información que nos proporcionarás en tu perfil (nombre, apellidos, foto). Esta información nos será útil para personalizar tu perfil'+                      
                      'Contenido de usuario (comentarios y otros materiales) que publiques en el servicio.'+ 
                      'La información que nos proporciones se utilizará en la plataforma para ajustarnos a tus preferencias, por lo que nadie más tendrá acceso a los datos que nos brindes.  ' 
                    })
                  }}>Aviso de privacidad
                  </a></li>
                <li className="list-inline-item me-4"><a 
                className="link-light" 
                style={{cursor:"pointer"}} 
                onClick={()=>(
                  MySwal.fire( {
                    title: 'NOSOTROS',
                    text: 'Somos una empresa especializada en el aprendizaje de idiomas y darle continuidad a las actividades de repaso.'
                  })
                )}>Nosotros
                </a></li>
                <li className="list-inline-item"><a 
                className="link-light" 
                style={{cursor:"pointer"}} 
                onClick={()=>(
                  MySwal.fire({
                    title: 'POLITICAS',
                    text: 'Break & English es un lugar seguro para todo tipo de estudiantes. El acoso y el contenido hiriente no será tolerado. Usar símbolos, nombres y textos que promuevan el ­­odio, el acoso o el acecho, así como el uso de comentarios sexuales hacia otros y la usurpación de identidad de otros usuarios, serán considerados abusivos.'+ 
                    'En Break & English No toleramos contenido que sea:'+                     
                    'Excesivamente profano o violento '+ 
                    'Mensajes no deseados '+
                    'Amenazante, acosador o intimidante'+  
                    'Asociado al racismo o la intolerancia'+  
                    'Personificación de otra persona de una manera engañosa o falsa'+                                 
                    'Información personal confidencial'+                     
                    'Vamos a remover cualquier contenido que viole el espíritu de estas reglas y correrás el riesgo de perder acceso parcial o completo a Break & English sin advertencia. Al seguir estas reglas, todos contribuiremos a una comunidad respetuosa y zana de aprendizaje. '
                  })
                )}>Políticas
                </a></li>
            </ul>
            <ul className="list-inline">
                <li className="list-inline-item me-4" 
                style={{cursor:"pointer"}} 
                onClick={()=>(
                  MySwal.fire({
                    title: '<strong>Facebook</strong>',
                    icon: 'info',
                    html: 
                    'Conocenos en <b>Facebook</b>, ' +
                    '<a href="https://www.facebook.com/joshua.sk.737">link</a> ' +
                    'se parte de nuestros seguidores',
                  })
                )}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-facebook text-light">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                    </svg></li>
                <li className="list-inline-item me-4" 
                style={{cursor:"pointer"}} 
                onClick={()=>(
                  MySwal.fire({
                    title: '<strong>Twitter</strong>',
                    icon: 'info',
                    html: 
                    'Conocenos en <b>Twitter</b>, ' +
                    '<a href="https://twitter.com/?lang=es ">link</a> ' +
                    'se parte de nuestra comunidad'
                  })
                )}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-twitter text-light">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg></li>
                <li className="list-inline-item" 
                style={{cursor:"pointer"}} 
                onClick={()=>(
                  MySwal.fire({
                    title: '<strong>Instagram</strong>',
                    icon: 'info',
                    html: 
                    'Conocenos en <b>Instagram</b>, ' +
                    '<a href="https://www.instagram.com/joshynni_arts/">link</a> ' +
                    'se parte de la comunidad en twitter'
                  })
                )}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-instagram text-light">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                    </svg></li>
            </ul>
            <p className="text-muted mb-0">Copyright © 2022 B&amp;L</p>
        </div>
    </footer>
  );
};
