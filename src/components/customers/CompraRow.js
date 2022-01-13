import moment from "moment";
import React from "react";
import { formatMonto } from "../../utils";

const CompraRow = ({ paquete, canRevoke, confirmRevoke }) => {
  return (
    <div className="row my-2">
      <div className="col">{paquete.class_package.title}</div>
      <div className="col">
        {moment(paquete.created_at).utc().format("DD MMM YYYY HH:mm")}
      </div>
      <div className="col">
        {paquete.is_gift ? (
          <i className="fas fa-gift"></i>
        ) : (
          canRevoke && (
            <>
              {"$"}
              {formatMonto(paquete.total_payment)} MXN
            </>
          )
        )}
      </div>
      <div className="col">
        {paquete.subscription_period !== null
          ? `${moment(paquete.createdAt).day()} de cada ${
              paquete.subscription_interval
            } ${
              paquete.subscription_period === "month"
                ? "mes"
                : paquete.subscription_period === "day"
                ? "día"
                : "año"
            }`
          : moment(paquete.expiration_date).format("DD MMM YYYY")}
      </div>
      <div className="col">
        {paquete.status === "cancelled" ? (
          <span className="badge badge-pill bg-danger">Cancelada</span>
        ) : (
          <span className="badge badge-pill bg-success">Activa</span>
        )}
      </div>
      <div className="col">
        {canRevoke && (
          <button
            className="btn btn-outline-danger"
            onClick={() => confirmRevoke(paquete)}
          >
            <i className="fa fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CompraRow;
