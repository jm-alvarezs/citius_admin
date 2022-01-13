import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { paymentMethods } from "../../utils";

const ExtendAccessForm = ({ customer, paquetes, extenderAcceso }) => {
  const [dias, setDias] = useState(0);
  const [gift, setGift] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paquete, setPaquete] = useState(null);
  const [packageID, setpackageID] = useState(null);

  useEffect(() => {
    if (paquetes && paquetes !== null && paquete === null) {
      setPaquete(paquetes[0]);
      setpackageID(paquetes[0].class_package_id);
      setDias(paquetes[0].expiration_days);
    }
  }, [paquetes]);

  useEffect(() => {
    if (paquete !== null) {
      setPaymentMethod(2);
    }
  }, [paquete]);

  const renderPaquetes = () => {
    if (paquetes && paquetes !== null) {
      return paquetes.map((paquete) => (
        <option key={paquete.class_package_id} value={paquete.class_package_id}>
          {paquete.title}
        </option>
      ));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    extenderAcceso(customer.customer_id, packageID, dias, gift, paymentMethod);
  };

  return (
    <div className="container-fluid px-0">
      <form onSubmit={handleSubmit}>
        <label>Paquete</label>
        <select
          className="form-control mb-3"
          onChange={(e) => setpackageID(e.target.value)}
        >
          {renderPaquetes()}
        </select>
        <label>Número de Días</label>
        <input
          type="number"
          className="form-control mb-3"
          value={dias}
          onChange={(e) => setDias(e.target.value)}
        />
        <label className="d-block">¿Es Regalo?</label>
        <Switch
          checked={gift}
          className="d-block mt-1 mb-3"
          onChange={(checked) => setGift(checked)}
        />
        {!gift && (
          <>
            <label className="d-block">Método de Pago</label>
            <select
              className="form-control mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {paymentMethods.map((payment_method) => (
                <option key={payment_method.value} value={payment_method.value}>
                  {payment_method.name}
                </option>
              ))}
            </select>
          </>
        )}
        <input type="submit" className="btn btn-dark" value="Extender Acceso" />
      </form>
    </div>
  );
};

export default ExtendAccessForm;
