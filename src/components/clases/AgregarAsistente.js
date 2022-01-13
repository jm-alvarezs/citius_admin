import React, { useContext, useState, useEffect } from "react";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import { CustomerContext } from "../../context/CustomerContext";
import Switch from "react-switch";
import { hideModal, paymentMethods } from "../../utils";

const AgregarAsistente = ({ single_class_id }) => {
  const [customer, setCustomer] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [isCash, setIsCash] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const { customers, getAllCustomers } = useContext(CustomerContext);

  const { postAsistenteClase } = useContext(ClassInstructorContext);

  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllCustomers({ query });
  }, [query]);

  useEffect(() => {
    if (isCash) {
      setPaymentMethodId(paymentMethods[0].value);
    } else {
      setPaymentMethodId(null);
    }
  }, [isCash]);

  const handleSubmit = (
    customer_id,
    single_class_id,
    payment_method_id,
    isPaid
  ) => {
    hideModal();
    setCustomer(null);
    postAsistenteClase(customer_id, single_class_id, payment_method_id, isPaid);
  };

  const renderCustomers = () => {
    if (customer !== null) {
      return (
        <div className="container-fluid px-0">
          <p>
            {customer.name} {customer.last_name}
          </p>
          <p>{customer.email}</p>
          <div className="row my-3">
            <div className="col col-md-6 bold">¿Pago fuera de Plataforma?</div>
            <div className="col col-md-6">
              <Switch
                checked={isCash}
                onChange={(checked) => setIsCash(checked)}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col col-md-6 bold">¿Pagada?</div>
            <div className="col col-md-6">
              <Switch
                checked={isPaid}
                onChange={(checked) => setIsPaid(checked)}
              />
            </div>
          </div>
          {isCash && (
            <div>
              <label>Método de Pago</label>
              <select
                value={paymentMethodId}
                className="form-control mb-3"
                onChange={(e) => setPaymentMethodId(e.target.value)}
              >
                {paymentMethods.map((payment_method) => (
                  <option
                    key={payment_method.value}
                    value={payment_method.value}
                  >
                    {payment_method.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            className="btn btn-dark"
            onClick={() =>
              handleSubmit(
                customer.customer_id,
                single_class_id,
                paymentMethodId,
                isPaid
              )
            }
          >
            Agregar a Clase
          </button>
        </div>
      );
    }
    if (customers && customers !== null) {
      return customers.map((customer) => (
        <div
          key={customer.customer_id}
          className="row align-items-center py-2 small hover-light border-top"
        >
          <div className="col col-md-4">
            {customer.name} {customer.last_name}
          </div>
          <div className="col col-md-4">{customer.email}</div>
          <div className="col col-md-4 text-end">
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setCustomer(customer)}
            >
              +
            </button>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid">
      <p>Buscar por nombre o correo.</p>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {renderCustomers()}
    </div>
  );
};

export default AgregarAsistente;
