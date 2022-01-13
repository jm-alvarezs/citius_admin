import React, { useEffect, useContext } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import Chart from "react-apexcharts";

const AnaliticasInscritos = () => {
  const { activos, vencer, mensuales, getInscritos } =
    useContext(AnaliticasContext);

  useEffect(() => {
    getInscritos();
  }, []);

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

  return (
    <div className="container-fluid px-0">
      <div className="row border-bottom pb-3 mb-3">
        <div className="container-fluid">
          <h1>Inscritos</h1>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-12 col-md-6">
          <div className="card p-3 no-scale mb-4">
            <p className="bold">Inscritos Activos este mes</p>
            <h3>{activos}</h3>
          </div>
          <div className="card p-3 no-scale">
            <p className="bold">Inscritos por Vencer este mes</p>
            <h3>{vencer}</h3>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="container-fluid">
            <div className="card p-3 no-scale overflow-x-hidden">
              <p className="bold">Inscritos por Mes</p>
              {renderChart()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasInscritos;
