import React, { useContext, useEffect } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import { formatMonto } from "../../utils";
import Chart from "react-apexcharts";

const AnaliticasPaquetes = () => {
  const { paquetes, getPaquetes } = useContext(AnaliticasContext);

  useEffect(() => {
    getPaquetes();
  }, []);

  const renderChart = () => {
    if (Array.isArray(paquetes)) {
      let globalTotal = 0;
      paquetes.forEach((paquete) => {
        globalTotal += paquete.total;
      });
      return (
        <Chart
          type="donut"
          height="415"
          width="100%"
          options={{
            labels: paquetes.map(({ title }) => title),
          }}
          series={paquetes.map(({ total }) => total / globalTotal)}
        />
      );
    }
  };

  const renderAlumnas = () => {
    if (paquetes && paquetes !== null) {
      return paquetes.map((paquete) => (
        <div className="row p-2">
          <div className="col">{paquete.title}</div>
          <div className="col">{paquete.purchases}</div>
          <div className="col">
            {"$"}
            {formatMonto(paquete.total)}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid">
      <PanelTitleDate title="Paquetes" />
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3 me-3 no-scale my-3">
            <h4>Compras por Paquete</h4>
            <HeaderRow headers={["Nombre", "Compras", "Total"]} />
            {renderAlumnas()}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3 me-3 no-scale my-3">
            <h4>Ingresos por Paquete</h4>
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasPaquetes;
