import React, { useEffect, useContext, useState } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import Chart from "react-apexcharts";
import moment from "moment";
import { formatMonto } from "../../utils";

const AnaliticasMensuales = () => {
  const [fechaInicio, setFechaInicio] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );
  const [fechaFin, setFechaFin] = useState(
    moment().endOf("year").format("YYYY-MM-DD")
  );
  const { purchases, reservations, getMensuales } =
    useContext(AnaliticasContext);

  useEffect(() => {
    getMensuales(fechaInicio, fechaFin);
  }, [fechaInicio, fechaFin]);

  const renderIngresosMensuales = () => {
    if (purchases && purchases !== null) {
      const data = new Array(12).fill(1);
      data.forEach((one, index) => {
        const month = purchases.find((mes) => mes.month === index + 1);
        if (month) {
          data[index] = {
            total: month.total,
            purchases: month.purchases,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        } else {
          data[index] = {
            total: 0,
            purchases: 0,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        }
      });
      return (
        <Chart
          type="area"
          options={{
            colors: ["#094f7f", "#f84f10", "#c6c0c1", "#000"],
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
            {
              name: "Compras por Mes",
              data: data.map(({ purchases }) => purchases),
            },
          ]}
        />
      );
    }
  };

  const renderChart = () => {
    if (Array.isArray(reservations)) {
      const data = new Array(12).fill(1);
      data.forEach((one, index) => {
        const month = reservations.find((mes) => mes.month === index + 1);
        if (month) {
          data[index] = {
            booked: month.booked,
            capacity: month.capacity,
            attended: month.attended,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        } else {
          data[index] = {
            booked: 0,
            capacity: 0,
            attended: 0,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        }
      });
      return (
        <Chart
          type="area"
          options={{
            colors: ["#094f7f", "#f84f10", "#c6c0c1", "#000"],
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
              name: "Reservaciones por Mes",
              data: data.map(({ booked }) => booked),
            },

            {
              name: "Asistentes por Mes",
              data: data.map(({ attended }) =>
                attended !== null ? attended : 0
              ),
            },
            {
              name: "Capacidad por Mes",
              data: data.map(({ capacity }) => capacity),
            },
          ]}
        />
      );
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row border-bottom pb-3 mb-3">
        <div className="col-6">
          <h1>Analíticas Mensuales</h1>
        </div>
        <div className="col-6">
          <div className="row mx-0">
            <div className="col-6">
              <input
                type="date"
                className="form-control ms-2"
                value={fechaInicio}
                onChange={(e) =>
                  setFechaInicio(moment(e.target.value).format("YYYY-MM-DD"))
                }
              />
            </div>
            <div className="col-6">
              <input
                type="date"
                className="form-control ms-2"
                value={fechaFin}
                onChange={(e) =>
                  setFechaFin(moment(e.target.value).format("YYYY-MM-DD"))
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-6">
          <div className="card shadow-sm p-3 no-scale overflow-x-hidden">
            <p className="bold">Reservaciones por Mes</p>
            {renderChart()}
          </div>
        </div>
        <div className="col-6">
          <div className="card shadow-sm p-3 no-scale overflow-x-hidden">
            <p className="bold">Ingresos por Mes</p>
            {renderIngresosMensuales()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasMensuales;
