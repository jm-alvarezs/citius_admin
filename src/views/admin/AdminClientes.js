import React, { useContext, useEffect, useState } from "react";
import CustomerCard from "../../components/customers/CustomerCard";
import { CustomerContext } from "../../context/CustomerContext";
import { UserContext } from "../../context/UserContext";
import { Link } from "@reach/router";

const AdminClientes = () => {
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState("asc");
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
        <CustomerCard
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
              <Link to="./nuevo" className="btn btn-accent w-100">
                + Agregar
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-0 align-items-center bg-light border py-2">
        <div
          className="col col-md-3 bold cursor-pointer"
          onClick={() => {
            setSort("name");
            if (sort === "name") {
              setDirection(direction === "asc" ? "desc" : "asc");
            }
          }}
        >
          Nombre{" "}
          <i
            className={`fa fa-chevron-${
              sort === "name" && direction === "asc" ? "up" : "down"
            }`}
          ></i>
        </div>
        <div className="col col-md-4 bold">Correo</div>
        <div className="col col-md-3 bold">Teléfono</div>
        <div
          className="col col-md-2 bold cursor-pointer"
          onClick={() => {
            setSort("total", direction === "asc" ? "desc" : "asc");
            if (sort === "total") {
              setDirection(direction === "asc" ? "desc" : "asc");
            }
          }}
        >
          Valor{" "}
        </div>
      </div>
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
  );
};

export default AdminClientes;
