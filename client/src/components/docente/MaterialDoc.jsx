import React from "react";

const MaterialDoc = () => {
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
              <li>
                <a className="dropdown-item" href="#scrollspyHeading1">
                  First
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#scrollspyHeading2">
                  Second
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#scrollspyHeading3">
                  Third
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#scrollspyHeading4">
                  Fourth
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Agregar
                </a>
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
        tabindex="0"
      >
        <br />
        <h4 id="scrollspyHeading1">First heading</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit varius congue,
          augue turpis vitae className egestas neque fames facilisi consequat
          litora, nisi eros eget tempor accumsan dictum vivamus torquent.
          Natoque vestibulum nisl lacus mus quisque accumsan porta tempor
          congue, ligula ad morbi massa venenatis purus urna erat, mi phasellus
          pellentesque convallis condimentum tristique maecenas nec. Dictum
          gravida mattis nunc fusce quisque risus condimentum, elementum tempor
          aliquam ullamcorper lacinia ante tempus, porttitor platea suspendisse
          nibh senectus commodo. Posuere est className fringilla dictum aptent in
          malesuada at, natoque fusce felis arcu ligula vel pharetra, fermentum
          hendrerit mauris purus condimentum neque magna. Primis taciti libero
          id eleifend fermentum iaculis hac auctor, faucibus quisque dignissim
          habitasse magna augue dis lobortis ornare, imperdiet litora nibh cum
          sociosqu sodales ac. Elementum sagittis consequat parturient purus non
          convallis tincidunt facilisi eleifend cras pellentesque ante mi
          nascetur nullam laoreet, nibh sollicitudin eu erat dis metus in tellus
          vivamus scelerisque est senectus commodo egestas et. Quam et lobortis
          sollicitudin rutrum ac commodo varius auctor tellus vehicula, sodales
          dui bibendum vulputate orci aenean nullam ridiculus phasellus
          scelerisque, nisi quis placerat vitae justo in ad dictumst eleifend.
        </p>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            <b>
              Escribe el texto que deseas agregar como material, puedes incluir
              links
            </b>
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Escribe aqui"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">
            Agregar material
          </button>
        </div>
        <br />
        <br />
        <h4 id="scrollspyHeading2">Second heading</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit varius congue,
          augue turpis vitae className egestas neque fames facilisi consequat
          litora, nisi eros eget tempor accumsan dictum vivamus torquent.
          Natoque vestibulum nisl lacus mus quisque accumsan porta tempor
          congue, ligula ad morbi massa venenatis purus urna erat, mi phasellus
          pellentesque convallis condimentum tristique maecenas nec. Dictum
          gravida mattis nunc fusce quisque risus condimentum, elementum tempor
          aliquam ullamcorper lacinia ante tempus, porttitor platea suspendisse
          nibh senectus commodo. Posuere est className fringilla dictum aptent in
          malesuada at, natoque fusce felis arcu ligula vel pharetra, fermentum
          hendrerit mauris purus condimentum neque magna. Primis taciti libero
          id eleifend fermentum iaculis hac auctor, faucibus quisque dignissim
          habitasse magna augue dis lobortis ornare, imperdiet litora nibh cum
          sociosqu sodales ac. Elementum sagittis consequat parturient purus non
          convallis tincidunt facilisi eleifend cras pellentesque ante mi
          nascetur nullam laoreet, nibh sollicitudin eu erat dis metus in tellus
          vivamus scelerisque est senectus commodo egestas et. Quam et lobortis
          sollicitudin rutrum ac commodo varius auctor tellus vehicula, sodales
          dui bibendum vulputate orci aenean nullam ridiculus phasellus
          scelerisque, nisi quis placerat vitae justo in ad dictumst eleifend.
        </p>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            <b>
              Escribe el texto que deseas agregar como material, puedes incluir
              links
            </b>
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Escribe aqui"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">
            Agregar material
          </button>
        </div>
        <br />
        <br />
        <h4 id="scrollspyHeading3">Third heading</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit varius congue,
          augue turpis vitae className egestas neque fames facilisi consequat
          litora, nisi eros eget tempor accumsan dictum vivamus torquent.
          Natoque vestibulum nisl lacus mus quisque accumsan porta tempor
          congue, ligula ad morbi massa venenatis purus urna erat, mi phasellus
          pellentesque convallis condimentum tristique maecenas nec. Dictum
          gravida mattis nunc fusce quisque risus condimentum, elementum tempor
          aliquam ullamcorper lacinia ante tempus, porttitor platea suspendisse
          nibh senectus commodo. Posuere est className fringilla dictum aptent in
          malesuada at, natoque fusce felis arcu ligula vel pharetra, fermentum
          hendrerit mauris purus condimentum neque magna. Primis taciti libero
          id eleifend fermentum iaculis hac auctor, faucibus quisque dignissim
          habitasse magna augue dis lobortis ornare, imperdiet litora nibh cum
          sociosqu sodales ac. Elementum sagittis consequat parturient purus non
          convallis tincidunt facilisi eleifend cras pellentesque ante mi
          nascetur nullam laoreet, nibh sollicitudin eu erat dis metus in tellus
          vivamus scelerisque est senectus commodo egestas et. Quam et lobortis
          sollicitudin rutrum ac commodo varius auctor tellus vehicula, sodales
          dui bibendum vulputate orci aenean nullam ridiculus phasellus
          scelerisque, nisi quis placerat vitae justo in ad dictumst eleifend.
        </p>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            <b>
              Escribe el texto que deseas agregar como material, puedes incluir
              links
            </b>
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Escribe aqui"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">
            Agregar material
          </button>
        </div>
        <br />
        <br />
        <h4 id="scrollspyHeading4">Fourth heading</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit varius congue,
          augue turpis vitae className egestas neque fames facilisi consequat
          litora, nisi eros eget tempor accumsan dictum vivamus torquent.
          Natoque vestibulum nisl lacus mus quisque accumsan porta tempor
          congue, ligula ad morbi massa venenatis purus urna erat, mi phasellus
          pellentesque convallis condimentum tristique maecenas nec. Dictum
          gravida mattis nunc fusce quisque risus condimentum, elementum tempor
          aliquam ullamcorper lacinia ante tempus, porttitor platea suspendisse
          nibh senectus commodo. Posuere est className fringilla dictum aptent in
          malesuada at, natoque fusce felis arcu ligula vel pharetra, fermentum
          hendrerit mauris purus condimentum neque magna. Primis taciti libero
          id eleifend fermentum iaculis hac auctor, faucibus quisque dignissim
          habitasse magna augue dis lobortis ornare, imperdiet litora nibh cum
          sociosqu sodales ac. Elementum sagittis consequat parturient purus non
          convallis tincidunt facilisi eleifend cras pellentesque ante mi
          nascetur nullam laoreet, nibh sollicitudin eu erat dis metus in tellus
          vivamus scelerisque est senectus commodo egestas et. Quam et lobortis
          sollicitudin rutrum ac commodo varius auctor tellus vehicula, sodales
          dui bibendum vulputate orci aenean nullam ridiculus phasellus
          scelerisque, nisi quis placerat vitae justo in ad dictumst eleifend.
        </p>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            <b>
              Escribe el texto que deseas agregar como material, puedes incluir
              links
            </b>
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Escribe aqui"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">
            Agregar material
          </button>
        </div>
        <br />
        <br />
        <h4 id="scrollspyHeading5">Fifth heading</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit varius congue,
          augue turpis vitae className egestas neque fames facilisi consequat
          litora, nisi eros eget tempor accumsan dictum vivamus torquent.
          Natoque vestibulum nisl lacus mus quisque accumsan porta tempor
          congue, ligula ad morbi massa venenatis purus urna erat, mi phasellus
          pellentesque convallis condimentum tristique maecenas nec. Dictum
          gravida mattis nunc fusce quisque risus condimentum, elementum tempor
          aliquam ullamcorper lacinia ante tempus, porttitor platea suspendisse
          nibh senectus commodo. Posuere est className fringilla dictum aptent in
          malesuada at, natoque fusce felis arcu ligula vel pharetra, fermentum
          hendrerit mauris purus condimentum neque magna. Primis taciti libero
          id eleifend fermentum iaculis hac auctor, faucibus quisque dignissim
          habitasse magna augue dis lobortis ornare, imperdiet litora nibh cum
          sociosqu sodales ac. Elementum sagittis consequat parturient purus non
          convallis tincidunt facilisi eleifend cras pellentesque ante mi
          nascetur nullam laoreet, nibh sollicitudin eu erat dis metus in tellus
          vivamus scelerisque est senectus commodo egestas et. Quam et lobortis
          sollicitudin rutrum ac commodo varius auctor tellus vehicula, sodales
          dui bibendum vulputate orci aenean nullam ridiculus phasellus
          scelerisque, nisi quis placerat vitae justo in ad dictumst eleifend.
        </p>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            <b>
              Escribe el texto que deseas agregar como material, puedes incluir
              links
            </b>
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Escribe aqui"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">
            Agregar material
          </button>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default MaterialDoc;
