import React from 'react'
import { NavLeft } from '../Ejercicios'

const TestDoc = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <NavLeft/>
          <div className="col-md-6 flex-fill" style={{marginTop: 83, paddingLeft: 52}}>
                <div>
                    <ul className="nav nav-tabs flex-column" role="tablist" style={{width: "20%!important", float:"left"}}>
                        <li className="nav-item" role="presentation"><a className="nav-link fw-bolder link-secondary" role="tab" data-bs-toggle="tab" href="#tab-1">Test 1</a></li>
                    </ul>
                    <div className="tab-content" style={{width: "80%!important", float: "right"}}>
                        <div className="tab-pane active" role="tabpanel" id="tab-1">
                            <h2>Test 1</h2>
                            <form className="row g-3">
                                <div className="col-md-6">
                                  <label htmlFor="inputEmail4" className="form-label">Nombre Actividad</label>
                                  <input type="text" className="form-control" id="nomactividad"/>
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="inputPassword4" className="form-label">Pregunta</label>
                                  <input type="text" className="form-control" id="preguntal"/>
                                </div>
                                <div>
                                    <select defaultValue={""} className="form-select" aria-label="Default select example">
                                        <option defaultValue={""}>Selecciona el tipo de pregunta</option>
                                        <option value="1">Abierta</option>
                                        <option value="2">Cerrada</option>
                                        <option value="3">Opcion multiple</option>
                                    </select>
                                    </div>
                            <div className="col-12">
                                  <label htmlFor="inputAddress" className="form-label"></label>
                                  <input type="text" className="form-control" id="inputAddress" placeholder=""/>
                                </div>
                                <div className="col-12">
                                  <button type="submit" className="btn btn-primary">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TestDoc