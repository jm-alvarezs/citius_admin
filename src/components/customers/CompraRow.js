import moment from "moment";
import React from "react";
import { formatMonto } from "../../utils";

const CompraRow = ({ paquete, canRevoke, confirmRevoke }) => {
  return (
    <div className="row p-2 small border-bottom align-items-center mx-0">
      <div className="col">{paquete.purchase_id}</div>
      <div className="col">{paquete.class_package.title}</div>
      <div className="col">
        {moment(paquete.createdAt).utc().format("DD MMM YYYY HH:mm")}
      </div>
      <div className="col">
        {paquete.is_gift && <i className="fas fa-gift me-1"></i>}
        {"$"}
        {formatMonto(paquete.total_payment)} MXN
      </div>
      <div className="col">
        {paquete.subscription_period !== null
          ? `${moment(paquete.createdAt).utc().format("DD")} de cada ${
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
        ) : paquete.status === "active" &&
          (paquete.subscription_id === null || paquete.admin_enabled) ? (
          <span className="badge badge-pill bg-success">Pagada</span>
        ) : paquete.status === "active" ? (
          <span className="badge badge-pill bg-success">Activa</span>
        ) : (
          <span className="badge badge-pull bg-warning">Pendiente</span>
        )}
      </div>
      <div className="col">
        {canRevoke && (
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => confirmRevoke(paquete)}
          >
            <i className="fa fa-times"></i> Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default CompraRow;
