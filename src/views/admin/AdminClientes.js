import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { UserContext } from "../../context/UserContext";
import { Link } from "@reach/router";
import CustomerRow from "../../components/customers/CustomerRow";
import HeaderRow from "../../components/global/HeaderRow";

const AdminClientes = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { customers, getAllCustomers } = useContext(CustomerContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAllCustomers({ page });
  }, []);

  useEffect(() => {
    getAllCustomers({ query, page });
  }, [query, page]);

  const renderCustomers = () => {
    if (customers && customers !== null) {
      let customersRender = [...customers];
      return customersRender.map((customer) => (
        <CustomerRow
          key={customer.customer_id}
          customer={customer}
          user={user}
        />
      ));
    }
    return <div className="spinner-border mt-3"></div>;
  };

  return (
    <div className="container-fluid">
      <div className="row mx-0 align-items-center mb-4 pb-2 border-bottom">
        <div className="col col-md-4 ps-0">
          <h1>Clientes</h1>
        </div>
        <div className="col col-md-8 pe-0">
          <div className="row">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 text-right">
              <Link
                to="/myadmin/customer/nuevo/edit"
                className="btn btn-accent w-100"
              >
                + Agregar
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card no-scale p-2">
        <HeaderRow
          headers={["Nombre", "Correo", "Teléfono", "Cumpleaños", "Valor"]}
        />
        {renderCustomers()}
        <div className="container-fluid px-0 text-right mt-3">
          <button
            className="btn btn-light mx-2 border"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            {"<"}
          </button>
          <span>{page}</span>
          <button
            className="btn btn-light mx-2 border"
            onClick={() => setPage(page + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClientes;
