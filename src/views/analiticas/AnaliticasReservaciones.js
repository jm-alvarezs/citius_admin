import React, { useContext, useEffect } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";

const AnaliticasReservaciones = () => {
  const { reservaciones, getReservaciones } = useContext(AnaliticasContext);

  useEffect(() => {
    getReservaciones();
  }, []);

  const renderReservaciones = () => {
    if (reservaciones && reservaciones !== null) {
      return reservaciones.map((tipo, index) => (
        <div key={index} className="row my-2">
          <div className="col-12 col-md-6 bold">{tipo.tipoClase}</div>
          <div className="col-12 col-md-6">{tipo.totalReservaciones}</div>
        </div>
      ));
    }
  };
  return (
    <div className="container-fluid px-0">
      <h2 className="border-bottom pb-3 mb-3">Reservaciones</h2>
      <div className="row">
        <div className="container-fluid">
          <div className="card p-3 no-scale me-3">
            <h4>Reservaciones por Clase</h4>
            {renderReservaciones()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasReservaciones;
