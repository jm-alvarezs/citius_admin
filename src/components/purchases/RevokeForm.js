import React, { useState } from "react";

const RevokeForm = ({ purchase, customer_id, cancelPurchase }) => {
  const [reason, setReason] = useState("");
  return (
    <div>
      <p>
        ¿Estás seguro que deseas revocar el acceso de la compra {purchase.title}
        ? Esta acción NO puede deshacerse.
      </p>
      <label>Razón</label>
      <input
        type="text"
        value={reason}
        className="form-control mb-3"
        onChange={(e) => setReason(e.target.value)}
      />
      <button
        className="btn btn-danger"
        onClick={() =>
          cancelPurchase(purchase.purchase_id, reason, customer_id)
        }
      >
        Revocar Acceso
      </button>
    </div>
  );
};

export default RevokeForm;
