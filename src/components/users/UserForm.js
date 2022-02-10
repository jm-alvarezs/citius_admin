import React, { useState, useContext, useEffect } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { UsersContext } from "../../context/UsersContext";
import { hideModal } from "../../utils";

const UserForm = () => {
  const [customer, setCustomer] = useState(null);
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const { customers, getAllCustomers } = useContext(CustomerContext);

  const { createUser } = useContext(UsersContext);

  useEffect(() => {
    if (query !== "") {
      getAllCustomers({ query });
    }
  }, [query]);

  useEffect(() => {
    if (customer !== null) {
      setEmail(customer.email);
    } else {
      setEmail("");
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, role);
  };

  const renderCustomers = () => {
    if (customer !== null) {
      return (
        <div>
          <div className="row mx-0 small align-items-center my-4">
            <div className="col">{customer.name}</div>
            <div className="col">{customer.email}</div>
            <div className="col text-right">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => setCustomer(null)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="row mt-3 align-items-center">
            <div className="col-6">
              <button className="btn btn-accent">Guardar</button>
            </div>
            <div className="col-6 text-right">
              <button className="btn btn-link text-secondary">Cancelar</button>
            </div>
          </div>
        </div>
      );
    }
    if (email !== "") {
      return (
        <div>
          <div className="row my-3 mx-0">
            <div className="col-6">{email}</div>
            <div className="col-6 text-right">
              <button className="btn btn-outline-danger">
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="row mt-3 align-items-center">
            <div className="col-6">
              <button type="submit" className="btn btn-accent">
                Guardar
              </button>
            </div>
            <div className="col-6 text-right">
              <button
                type="button"
                onClick={hideModal}
                className="btn btn-link text-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (customers && customers !== null) {
      if (customers.length === 0 && query !== "") {
        return (
          <button
            className="btn btn-outline-secondary my-3"
            onClick={() => setEmail(query)}
          >
            + Invitar
          </button>
        );
      }
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
    <form onSubmit={handleSubmit}>
      <label>Rol</label>
      <select
        className="form-control mb-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="coach">Coach</option>
      </select>
      <p>Buscar usuario por nombre o correo.</p>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {renderCustomers()}
    </form>
  );
};

export default UserForm;
