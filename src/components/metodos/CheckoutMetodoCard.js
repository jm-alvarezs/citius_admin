import React from "react";
import mastercard from "../../assets/images/payment-method-mc.png";
import visa from "../../assets/images/payment-method-visa.png";
import amex from "../../assets/images/payment-method-amex.png";

const CheckoutMetodoCard = ({ metodo, setPaymentMethod, paymentMethod }) => {
  return (
    <div className="card p-3 no-scale my-3">
      <div className="row mx-0">
        <div className="col-1">
          <input
            type="radio"
            checked={paymentMethod === metodo}
            onChange={() => setPaymentMethod(metodo)}
          />
        </div>
        <div className="col-11">
          <div className="row align-items-center">
            <div className="col col-md-4">
              <img
                src={
                  metodo.card_type === "mastercard"
                    ? mastercard
                    : metodo.card_type === "visa"
                    ? visa
                    : amex
                }
                className="card-type"
                alt="card type"
              />
            </div>
            <div className="col col-md-4 capitalize">{metodo.card_type}</div>
            <div className="col col-md-4">
              {"**** "}
              {metodo.last_digits}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutMetodoCard;
