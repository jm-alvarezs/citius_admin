import React, { useEffect, useContext, useState } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import Chart from "react-apexcharts";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import CustomerRow from "../../components/customers/CustomerRow";
import HeaderRow from "../../components/global/HeaderRow";

const AnaliticasInscritos = () => {
  const [viewCustomers, setViewCustomers] = useState(null);
  const { nuevos, activos, cancelados, mensuales, getInscritos } =
    useContext(AnaliticasContext);

  const renderChart = () => {
    if (mensuales && mensuales !== null) {
      const activosMensuales = [];
      for (let i = 0; i < 12; i++) {
        let mes = mensuales.find(({ mes }) => parseInt(mes) === i + 1);
        if (mes) activosMensuales.push(mes.activos);
        else activosMensuales.push(0);
      }
      return (
        <Chart
          type="area"
          options={{
            colors: ["#dec1a1"],
            xaxis: {
              categories: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
              ],
            },
          }}
          series={[
            {
              name: "Inscritos por Mes",
              data: activosMensuales,
            },
          ]}
        />
      );
    }
  };

  const renderCustomers = () => {
    if (viewCustomers !== null) {
      let renderCustomers = [];
      switch (viewCustomers) {
        case "nuevos":
          renderCustomers = nuevos;
          break;
        case "cancelados":
          renderCustomers = cancelados;
          break;
        default:
          renderCustomers = activos;
      }
      return (
        <div className="card p-3 no-scale">
          {" "}
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <h3 className="mb-0">
                Clientes{" "}
                <span className="text-capitalize">{viewCustomers}</span>
              </h3>
            </div>
            <div className="col-12 col-md-6 text-right">
              <button
                className="btn btn-link text-secondary"
                onClick={() => setViewCustomers(null)}
              >
                Ocultar
              </button>
            </div>
          </div>
          <HeaderRow
            headers={["Nombre", "Correo", "Teléfono", "Cumpleaños", "Valor"]}
          />
          {renderCustomers.map((customer) => (
            <CustomerRow key={customer.customer_id} customer={customer} />
          ))}
        </div>
      );
    }
  };

  const renderAmount = (data) => {
    if (Array.isArray(data)) {
      return data.length;
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid px-0 mb-3">
      <PanelTitleDate title="Inscritos" callback={getInscritos} />
      <div className="row mt-4">
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3 no-scale mb-4">
            <p className="bold">Inscritos Activos este mes</p>
            <h3 className="mb-0">{renderAmount(activos)}</h3>
            <button
              className="btn btn-link text-secondary text-left px-0 my-2"
              onClick={() => setViewCustomers("activos")}
            >
              Expandir
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3 no-scale">
            <p className="bold">Inscritos Cancelados este mes</p>
            <h3 className="mb-0">{renderAmount(cancelados)}</h3>
            <button
              className="btn btn-link text-secondary text-left px-0 my-2"
              onClick={() => setViewCustomers("cancelados")}
            >
              Expandir
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3 no-scale">
            <p className="bold">Inscritos Nuevos este mes</p>
            <h3 className="mb-0">{renderAmount(nuevos)}</h3>
            <button
              className="btn btn-link text-secondary text-left px-0 my-2"
              onClick={() => setViewCustomers("nuevos")}
            >
              Expandir
            </button>
          </div>
        </div>
      </div>
      {renderCustomers()}
    </div>
  );
};

export default AnaliticasInscritos;
