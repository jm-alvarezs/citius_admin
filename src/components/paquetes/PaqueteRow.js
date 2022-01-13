import React from "react";
import { Link } from "@reach/router";
import { formatMonto } from "../../utils";

const PaqueteRow = ({ paquete, confirmDelete }) => {
  const { class_package_id, title, available, price, sale_price } = paquete;
  return (
    <div className="card p-2 hover-light no-scale br-0">
      <div className="row small align-items-center">
        <div className="col col-md-3">{title}</div>
        <div className="col col-md-2">
          {available ? (
            <i className="fa fa-check text-success"></i>
          ) : (
            <i className="fa fa-times text-danger"></i>
          )}
        </div>
        <div className="col col-md-2">
          {"$"}
          {formatMonto(price)}
        </div>
        <div className="col col-md-2">
          {sale_price === null ? "" : `$${formatMonto(sale_price)}`}
        </div>
        <div className="col col-md-2">
          <Link
            className="btn btn-outline-secondary btn-sm"
            to={`./${class_package_id}`}
          >
            <i className="fa fa-edit"></i> Editar
          </Link>
          <button
            className="btn btn-outline-danger btn-sm mx-3"
            onClick={() => confirmDelete(paquete)}
          >
            <i className="fa fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaqueteRow;
