import React, { useState } from "react";

const RemoveClassesForm = ({ customer_id, removeClasses }) => {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    removeClasses(customer_id, amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="bold">Clases a Restar</label>
      <input
        type="number"
        className="form-control mb-3"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-danger"
        onClick={() => removeClasses(customer_id, amount)}
      >
        Restar Clases
      </button>
    </form>
  );
};

export default RemoveClassesForm;
