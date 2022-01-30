import React from "react";
import moment from "moment";

const CircuitoRow = ({ circuit, handleBook, handleCancel, handleEdit }) => {
  return (
    <div className="row p-2 align-items-center border-bottom">
      <div className="col">{circuit.available_circuit_id}</div>
      <div className="col">
        {circuit.usedAt !== null ? (
          <span className="badge bg-success">Reservado</span>
        ) : (
          <span className="badge bg-secondary">Disponible</span>
        )}
      </div>
      <div className="col">
        {moment(circuit.expiration_date).format("DD MMM YYYY")}
        <button className="btn btn-link text-secondary mx-2 py-0">
          <i className="fa fa-edit"></i>
        </button>
      </div>
      <div className="col">
        {circuit.usedAt !== null &&
          moment(circuit.usedAt).format("DD MMM YYYY")}
      </div>
      <div className="col">
        {circuit.usedAt === null ? (
          <button
            className="btn btn-outline-success me-2"
            onClick={() => handleBook(circuit)}
          >
            <i className="fa fa-calendar"></i>
          </button>
        ) : (
          <button className="btn btn-outline-danger me-2">
            <i className="fa fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CircuitoRow;
