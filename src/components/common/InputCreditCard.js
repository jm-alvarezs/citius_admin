import React, { useContext, useState } from "react";
import CreditCardInput from "react-credit-card-input";
import { MetodosContext } from "../../context/MetodosContext";

const FormCreditCard = ({ modifier, saveCard }) => {
  const [nombre, setNombre] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [cvc, setCvc] = useState("");

  const { spinner } = useContext(MetodosContext);

  function handleSubmit(e) {
    e.preventDefault();
    modifier(nombre, number, expiry, cvc);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre en la Tarjeta</label>
      <input
        type="text"
        className="form-control mb-3"
        style={{ maxWidth: 409 }}
        onChange={(e) => setNombre(e.target.value)}
      />
      <CreditCardInput
        cardNumberInputProps={{
          value: number,
          onChange: (e) => setNumber(e.target.value),
        }}
        cardExpiryInputProps={{
          value: expiry,
          onChange: (e) => setExpiry(e.target.value),
        }}
        cardCVCInputProps={{
          value: cvc,
          onChange: (e) => setCvc(e.target.value),
        }}
        fieldClassName="input"
      />
      <div className="container-fluid px-0 mt-3">
        <button
          type="submit"
          className="btn btn-dark btn-block"
          disabled={spinner}
        >
          {spinner ? (
            <div className="spinner-border"></div>
          ) : saveCard ? (
            "Guardar"
          ) : (
            "Pagar Ahora"
          )}
        </button>
      </div>
    </form>
  );
};

export default FormCreditCard;
