import React from "react";
import moment from "moment";

const DescuentoCard = ({ descuento, editarDescuento, confirmDelete }) => {
  const { discount_id, title, code, amount, expiration_date, is_percent } =
    descuento;
  return (
    <div className="row">
      <div className="card no-scale shadow-sm p-3">
        <div className="row align-items-center">
          <div className="col">{code}</div>
          <div className="col">
            {!is_percent && "$"}
            {amount}
            {is_percent && "%"}
          </div>
          <div className="col">
            {moment(expiration_date).format("DD MMM YYYY")}
          </div>
          <div className="col">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => editarDescuento(discount_id)}
            >
              <i className="fa fa-edit"></i> Editar
            </button>
            <button
              className="btn btn-outline-danger btn-sm mx-3"
              onClick={() =>
                confirmDelete({
                  discount_id,
                  title,
                  code,
                })
              }
            >
              <i className="fa fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescuentoCard;
