import React, { useContext, useEffect, useState } from "react";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import HeaderRow from "../../components/global/HeaderRow";
import Pagination from "../../components/global/Pagination";
import InvoiceRow from "../../components/invoices/InvoiceRow";
import { InvoicesContext } from "../../context/InvoicesContext";

const AdminInvoices = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const { spinner, invoices, getInvoices } = useContext(InvoicesContext);

  useEffect(() => {
    if (startDate !== "" && endDate !== "" && !spinner) {
      fetchInvoices();
    }
  }, [startDate, endDate, page, status, query]);

  const fetchInvoices = () => {
    getInvoices(startDate, endDate, { page, status, query });
  };

  const setDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const renderInvoices = () => {
    if (Array.isArray(invoices)) {
      if (invoices.length === 0) {
        return <p className="mb-0 mx-2 mt-2">No hay cargos en estas fechas.</p>;
      }
      return invoices.map((invoice) => (
        <InvoiceRow key={invoice.invoice_id} invoice={invoice} />
      ));
    }
    return <div className="spinner-border mt-3"></div>;
  };

  return (
    <div className="container-fluid">
      <PanelTitleDate title="Pagos" callback={setDates} />
      <div className="container-fluid px-0">
        <input
          type="text"
          value={query}
          className="form-control mb-3"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o correo electrónico..."
        />
      </div>
      <div className="card no-scale p-3 mb-3 shadow-sm">
        <div className="container-fluid px-0">
          <button
            className={`btn btn-${
              status === "" ? "primary" : "light"
            } border br-0`}
            onClick={() => setStatus("")}
          >
            Todo
          </button>
          <button
            className={`btn btn-${
              status === "completed" ? "primary" : "light"
            } border br-0`}
            onClick={() => setStatus("completed")}
          >
            Completados
          </button>
          <button
            className={`btn btn-${
              status === "failed" ? "primary" : "light"
            } border br-0`}
            onClick={() => setStatus("failed")}
          >
            Fallidos
          </button>
          <button
            className={`btn btn-${
              status === "pending" ? "primary" : "light"
            } border br-0`}
            onClick={() => setStatus("pending")}
          >
            Pendientes
          </button>
        </div>
        <HeaderRow
          headers={[
            "# Cargo",
            "# Membresía",
            "Paquete",
            "Cliente",
            "Total",
            "Estado",
            "Fecha",
            "Forma de Pago",
          ]}
        />
        {renderInvoices()}
        <Pagination modifier={setPage} />
      </div>
    </div>
  );
};

export default AdminInvoices;
