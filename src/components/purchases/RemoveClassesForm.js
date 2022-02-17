import React, { useState } from "react";

const RemoveClassesForm = ({ customer_id, removeClasses }) => {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    removeClasses(customer_id, amount);
  };

  return (
    <div className="container-fluid ">
      <form onSubmit={handleSubmit}>
        <label>Ingresa la cantidad a restar</label>
        <input
          type="text"
          value={amount}
          className="form-control mb-3"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" className="btn btn-danger">
          Restar Clases
        </button>
      </form>
    </div>
  );
};

export default RemoveClassesForm;
