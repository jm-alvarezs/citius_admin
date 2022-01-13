import React from "react";
import mastercard from "../../assets/images/payment-method-mc.png";
import visa from "../../assets/images/payment-method-visa.png";
import amex from "../../assets/images/payment-method-amex.png";

const MetodoCard = ({ metodo, deleteMetodo }) => {
  const { conekta_payment_source_id, card_type, last_digits } = metodo;
  return (
    <div
      className="card p-3 shadow-sm my-3 no-scale"
      key={conekta_payment_source_id}
    >
      <div className="row align-items-center">
        <div className="col col-md-2">
          <img
            src={
              card_type === "mastercard"
                ? mastercard
                : card_type === "visa"
                ? visa
                : amex
            }
            className="card-type"
            alt="card type"
          />
        </div>
        <div className="col col-md-4 capitalize">{card_type}</div>
        <div className="col col-md-4">
          {"**** "}
          {last_digits}
        </div>
        <div className="col col-md-2">
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteMetodo(metodo)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MetodoCard;
