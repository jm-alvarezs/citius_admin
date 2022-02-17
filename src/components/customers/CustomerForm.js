import { Link } from "@reach/router";
import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import BirthdateInput from "../common/BirthdateInput";
import DateTimeInput from "../common/DateTimeInput";

const CustomerForm = ({ customer_id }) => {
  const {
    spinner,
    customer,
    getCustomer,
    postCustomer,
    createCustomer,
    setPropiedadCustomer,
  } = useContext(CustomerContext);

  useEffect(() => {
    if (isNaN(customer_id)) {
      createCustomer();
    } else {
      getCustomer(customer_id);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postCustomer(customer);
  };

  const renderForm = () => {
    if (customer && customer !== null) {
      return (
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.name}
            onChange={(e) => setPropiedadCustomer("name", e.target.value)}
          />
          <label>Apellidos</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.last_name}
            onChange={(e) => setPropiedadCustomer("last_name", e.target.value)}
          />
          <label>Correo Electrónico</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.email}
            onChange={(e) => setPropiedadCustomer("email", e.target.value)}
          />
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.phone}
            onChange={(e) => setPropiedadCustomer("phone", e.target.value)}
          />
          <label>Instagram</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.instagram}
            onChange={(e) => setPropiedadCustomer("instagram", e.target.value)}
          />
          <BirthdateInput
            value={customer.birthdate}
            modifier={(value) => setPropiedadCustomer("birthdate", value)}
          />
          <label>¿Cómo te enteraste de Citius?</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.signup_reason}
            onChange={(e) =>
              setPropiedadCustomer("signup_reason", e.target.value)
            }
          />
          <div className="row">
            <div className="col-6">
              <button className="btn btn-accent">
                {spinner ? <div className="spinner-border"></div> : "Guardar"}
              </button>
            </div>
            <div className="col-6 text-right">
              <Link
                to="/myadmin/clientes"
                className="btn btn-link text-secondary"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return <div>{renderForm()}</div>;
};

export default CustomerForm;
