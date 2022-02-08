import React, { useContext, useEffect } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import { formatMonto } from "../../utils";
import HeaderRow from "../../components/global/HeaderRow";
import Chart from "react-apexcharts";

const AnaliticasIngresos = () => {
  const { income, payment_methods, getIngresos } =
    useContext(AnaliticasContext);

  useEffect(() => {
    getIngresos();
  }, []);

  const datesCallback = (start_date, end_date) => {
    getIngresos(start_date, end_date);
  };

  const renderChart = () => {
    if (Array.isArray(payment_methods)) {
      let total = 0;
      payment_methods.forEach((payment_method) => {
        total += parseFloat(payment_method.total);
      });
      const data = payment_methods.map((payment_method) => ({
        ...payment_method,
        porcentaje: parseFloat(payment_method.total) / parseFloat(total),
      }));
      return (
        <Chart
          type="donut"
          height="415"
          width="100%"
          options={{
            labels: data.map(({ name }) => name),
          }}
          series={data.map(({ porcentaje }) => porcentaje)}
        />
      );
    }
  };

  const renderIngresos = () => {
    if (income && income !== null) {
      return (
        <h4 className="h1 normal">
          {"$"}
          {formatMonto(income.total)}
        </h4>
      );
    }
    return <div className="spinner-border"></div>;
  };

  const renderPayments = () => {
    if (income && income !== null) {
      return <h4 className="h1 normal">{income.payments}</h4>;
    }
    return <div className="spinner-border"></div>;
  };

  const renderMetodos = () => {
    if (payment_methods && payment_methods !== null) {
      return payment_methods.map((metodo) => (
        <div
          key={metodo.name}
          className="row p-2 mx-0 align-items-center border-bottom"
        >
          <div className="col-4">{metodo.name}</div>
          <div className="col-4">{metodo.payments}</div>
          <div className="col-4">
            {"$"}
            {formatMonto(metodo.total)}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid px-0">
      <PanelTitleDate title="Ingresos" callback={datesCallback} />
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="card shadow-sm p-3 no-scale">
                <h3>Ingresos Totales</h3>
                {renderIngresos()}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card shadow-sm p-3 no-scale">
                <h3>Pagos Totales</h3>
                {renderPayments()}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="container-fluid">
              <div className="card shadow-sm p-3 no-scale pb-4">
                <h3>Métodos de Pago</h3>
                <HeaderRow headers={["Nombre", "Pagos", "Total"]} />
                {renderMetodos()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3 no-scale">
            <h3>Ingresos por Métodos de Pago</h3>
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasIngresos;
