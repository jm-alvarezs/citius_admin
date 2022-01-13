import React from "react";

const Logro = ({ logro, texto, onClick }) => {
  return (
    <div className="container-fluid px-0 text-center">
      <h2>¡Felicidades!</h2>
      <h3>{logro}</h3>
      <p>{texto}</p>
      <button className="btn btn-primary" onClick={onClick}>
        Continuar
      </button>
    </div>
  );
};

export default Logro;
