import React, { useContext, useEffect, useState } from "react";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import { PurchasesContext } from "../../context/PurchasesContext";
import HeaderRow from "../../components/global/HeaderRow";
import PurchaseRow from "../../components/purchases/PurchaseRow";
import Pagination from "../../components/global/Pagination";

const AdminOrdenes = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const { spinner, purchases, getPurchases } = useContext(PurchasesContext);

  useEffect(() => {
    if (startDate !== "" && endDate !== "" && !spinner) {
      fetchPurchases();
    }
  }, [startDate, endDate, page, status, query]);

  const fetchPurchases = () => {
    getPurchases(startDate, endDate, { page, status, query });
  };

  const setDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const renderPurchases = () => {
    if (Array.isArray(purchases)) {
      if (purchases.length === 0) {
        return (
          <p className="mb-0 mx-2 mt-2">No hay pedidos en estas fechas.</p>
        );
      }
      return purchases.map((purchase) => (
        <PurchaseRow key={purchase.purchase_id} purchase={purchase} />
      ));
    }
    return <div className="spinner-border mt-3"></div>;
  };

  return (
    <div className="container-fluid">
      <PanelTitleDate title="Pedidos" callback={setDates} />
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
              status === "active" ? "primary" : "light"
            } border br-0`}
            onClick={() => setStatus("active")}
          >
            Activos
          </button>
          <button
            className={`btn btn-${
              status === "cancelled" ? "primary" : "light"
            } border br-0`}
            onClick={() => setStatus("cancelled")}
          >
            Cancelados
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
            "#",
            "Paquete",
            "Cliente",
            "Precio",
            "Estado",
            "Fecha",
            "Forma de Pago",
          ]}
        />
        {renderPurchases()}
        <Pagination modifier={setPage} />
      </div>
    </div>
  );
};

export default AdminOrdenes;
