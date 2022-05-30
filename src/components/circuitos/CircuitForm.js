import React, { useState } from "react";

const AddCircuitForm = ({ customer_id, addCircuits }) => {
  const [amount, setAmount] = useState(0);
  const [expiration, setExpiration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCircuits({ customer_id, amount, expiration_days: expiration });
  };

  return (
    <div className="container-fluid ">
      <form onSubmit={handleSubmit}>
        <label>Ingresa la cantidad a agregar</label>
        <input
          type="number"
          value={amount}
          className="form-control mb-3"
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>Ingresa los días de vigencia a partir de hoy</label>
        <input
          type="number"
          value={expiration}
          className="form-control mb-3"
          onChange={(e) => setExpiration(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Agregar Circuitos
        </button>
      </form>
    </div>
  );
};

export default AddCircuitForm;
