import React, { useContext, useEffect } from "react";
import OrdenCard from "../components/ordenes/OrdenCard";
import { PurchasesContext } from "../context/PurchasesContext";
import { UserContext } from "../context/UserContext";

const Vencimientos = () => {
  const { user } = useContext(UserContext);
  const { purchases, getPurchases } = useContext(PurchasesContext);

  useEffect(() => {
    getPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPresenciales = () => {
    if (purchases && purchases !== null) {
      if (purchases.length === 0) {
        return <p>No haz hecho ninguna compra.</p>;
      }
      let ordenesRender = purchases.filter(
        (orden) => !orden.is_virtual_class && !orden.include_online_membership
      );
      if (ordenesRender.length === 0) {
        return <p>No has comprado clases presenciales.</p>;
      }
      return ordenesRender.map((orden) => (
        <OrdenCard key={orden.purchase_id} payment={orden} />
      ));
    }
  };

  return (
    <div className="container-fluid">
      <div className="mx-0 row align-items-center mb-3">
        <div className="container-fluid px-0">
          <h2>Mis Vencimientos</h2>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row align-items-center bold bg-light border py-2">
          <div className="col col-md-6 bold">Paquete Presencial</div>
          <div className="col col-md-6 bold">Vence en</div>
        </div>
      </div>
      {renderPresenciales()}
    </div>
  );
};

export default Vencimientos;
