import React, { useState } from "react";

const AddClassesForm = ({ customer_id, addClasses }) => {
  const [amount, setAmount] = useState(0);
  const [expiration, setExpiration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addClasses(customer_id, amount, expiration);
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
          Agregar Clases
        </button>
      </form>
    </div>
  );
};

export default AddClassesForm;
