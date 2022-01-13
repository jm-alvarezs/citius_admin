import React from "react";

export default function ({ direccion, modifier, submit }) {
  function handleChange(event) {
    const { value, name } = event.target;
    modifier(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit(direccion);
  }

  const {
    calle,
    numero,
    numero_int,
    colonia,
    ciudad,
    estado,
    codigo_postal,
  } = direccion;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-12 col-md-6 my-3">
          <label>Calle</label>
          <input
            type="text"
            className="form-control"
            name="calle"
            value={calle === null ? "" : calle}
            onChange={handleChange}
          />
        </div>
        <div className="col col-12 col-md-6 my-3">
          <div className="row">
            <div className="col col-6">
              <label>Número</label>
              <input
                type="text"
                className="form-control"
                name="numero"
                value={numero === null ? "" : numero}
                onChange={handleChange}
              />
            </div>
            <div className="col col-6">
              <label>Interior (opcional)</label>
              <input
                type="text"
                className="form-control"
                name="numero_int"
                value={numero_int === null ? "" : numero_int}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <label>Colonia</label>
        <input
          type="text"
          className="form-control"
          name="colonia"
          value={colonia === null ? "" : colonia}
          onChange={handleChange}
        />
      </div>
      <div className="my-3">
        <label>Ciudad</label>
        <input
          type="text"
          className="form-control"
          name="ciudad"
          value={ciudad === null ? "" : ciudad}
          onChange={handleChange}
        />
      </div>
      <div className="row my-3">
        <div className="col col-6">
          <label>Estado</label>
          <input
            type="text"
            className="form-control"
            name="estado"
            value={estado === null ? "" : estado}
            onChange={handleChange}
          />
        </div>
        <div className="col col-6">
          <label>Codigo Postal</label>
          <input
            type="text"
            className="form-control"
            name="codigo_postal"
            value={codigo_postal === null ? "" : codigo_postal}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
