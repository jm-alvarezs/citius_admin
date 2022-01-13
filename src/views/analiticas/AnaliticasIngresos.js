import moment from "moment";
import React, { useContext, useEffect } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import Chart from "react-apexcharts";
import { formatMonto } from "../../utils";

const AnaliticasIngresos = () => {
  const { ingresosMensuales, proyeccionMes, metodosPago, getIngresos } =
    useContext(AnaliticasContext);

  useEffect(() => {
    getIngresos();
  }, []);

  const renderProyeccion = () => {
    if (proyeccionMes && proyeccionMes !== null) {
      return (
        <>
          <div className="row">
            <div className="col-12 col-md-6">
              <p>Compras:</p>
            </div>
            <div className="col-12 col-md-6">{proyeccionMes.compras}</div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <p>Ingresos:</p>
            </div>
            <div className="col-12 col-md-6">
              {"$"}
              {formatMonto(proyeccionMes.ingresosTotales)}
            </div>
          </div>
        </>
      );
    }
  };

  const renderIngresosMensuales = () => {
    if (ingresosMensuales && ingresosMensuales !== null) {
      const data = new Array(12).fill(1);
      data.forEach((one, index) => {
        const month = ingresosMensuales.find((mes) => mes.idMes === index + 1);
        if (month) {
          data[index] = {
            total: month.total,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        } else {
          data[index] = {
            total: 0,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        }
      });
      return (
        <Chart
          type="area"
          options={{
            colors: ["#dec1a1"],
            dataLabels: {
              formatter: (val, opts) => {
                return `$${formatMonto(val)}`;
              },
            },
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
            { name: "Ingresos por Mes", data: data.map(({ total }) => total) },
          ]}
        />
      );
    }
  };

  const renderMetodos = () => {
    if (metodosPago && metodosPago !== null) {
      return metodosPago.map((metodo) => (
        <div key={metodo.name} className="row">
          <div className="col-6 col-md-6">
            <p>{metodo.name}</p>
          </div>
          <div className="col-6 col-md-6">
            <p>{metodo.count}</p>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid px-0">
      <h2 className="border-bottom pb-3 mb-3">Ingresos</h2>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card p-3 no-scale">
            <h3>Ingresos Mensuales</h3>
            {renderIngresosMensuales()}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card p-3 no-scale my-2">
            <h3>Métodos de Pago {moment().add(1, "month").format("MMM")}</h3>
            {renderMetodos()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasIngresos;
