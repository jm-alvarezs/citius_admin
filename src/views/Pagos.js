import React, { useContext, useEffect } from "react";
import OrdenCard from "../components/ordenes/OrdenCard";
import { PurchasesContext } from "../context/PurchasesContext";

const Pagos = () => {
  const { purchases, getMyPurchases } = useContext(PurchasesContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOrdenes = () => {
    if (purchases && purchases !== null) {
      if (purchases.length === 0) {
        return <p>No haz hecho ninguna compra.</p>;
      }
      return purchases.map((orden) => (
        <OrdenCard key={orden.payment_id} payment={orden} />
      ));
    }
  };

  return (
    <div className="container-fluid">
      <div className="mx-0 row align-items-center pb-3 mb-3 border-bottom">
        <div className="container-fluid px-0">
          <h2>Mis Pagos</h2>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col col-md-2 bold">Orden</div>
        <div className="col col-md-2 bold">Compra</div>
        <div className="col col-md-2 bold">Total</div>
        <div className="col col-md-3 bold">Fecha y Hora</div>
        <div className="col col-md-2 bold">Duración de Paquete</div>
      </div>
      {renderOrdenes()}
    </div>
  );
};

export default Pagos;
