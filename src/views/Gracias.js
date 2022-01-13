import { Link } from "@reach/router";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { PurchasesContext } from "../context/PurchasesContext";
import { UserContext } from "../context/UserContext";

const Gracias = ({ purchase_id }) => {
  const { purchase, getPurchase } = useContext(PurchasesContext);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user !== null && purchase === null) {
      getPurchase(purchase_id);
    }
  }, [user]);

  useEffect(() => {
    if (purchase !== null) {
      if (purchase.name === null) {
        setTimeout(() => {
          getPurchase(purchase_id);
        }, 3000);
      }
    }
  }, [purchase]);

  const renderOrden = () => {
    if (purchase && purchase !== null) {
      return (
        <div>
          <div className="mb-4">
            <h3>{purchase.title}</h3>
            <p>
              Fecha: {moment(purchase.created_at).format("DD MMM YYYY HH:mm")}
            </p>
            <p>
              Total: {"$"}
              {purchase.total_payment} MXN
            </p>
          </div>
          <h4 className="border-bottom mt-4 pb-2">Detalles</h4>
          <p>Clases Compradas: {purchase.class_amount}</p>
          <p>Días de Vigencia: {purchase.expiration_days}</p>
          <p>Método de Pago: {purchase.payment_method.name}</p>
        </div>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid bg-black vh-100 pt-5">
      <div className="container text-white py-5">
        <h1 className="text-center m-4">¡Gracias por tu compra!</h1>
        <div className="vibe-card mw-500 m-auto d-block p-4">
          {renderOrden()}
          <Link to="/myadmin" className="btn btn-accent bold">
            Ir a Calendario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gracias;
