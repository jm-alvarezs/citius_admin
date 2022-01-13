import React, { useContext, useEffect } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";

const AnaliticasPaquetes = () => {
  const { paquetes, getPaquetes } = useContext(AnaliticasContext);

  useEffect(() => {
    getPaquetes();
  }, []);

  const renderAlumnas = () => {
    if (paquetes && paquetes !== null) {
      return paquetes.map((paquete) => (
        <div className="row my-2">
          <div className="col-12 col-md-6 bold">{paquete.paquete}</div>
          <div className="col-12 col-md-6">{paquete.total}</div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid px-0">
      <h2 className="border-bottom pb-3 mb-3">Paquetes</h2>
      <div className="row">
        <div className="container-fluid">
          <div className="card p-3 me-3 no-scale my-3">
            <h4>Inscritos por Paquete este Mes</h4>
            {renderAlumnas()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasPaquetes;
