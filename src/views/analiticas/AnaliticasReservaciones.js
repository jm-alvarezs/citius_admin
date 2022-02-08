import React, { useContext, useEffect } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import Chart from "react-apexcharts";

const AnaliticasReservaciones = () => {
  const { reservaciones, horas, getReservaciones } =
    useContext(AnaliticasContext);

  useEffect(() => {
    getReservaciones();
  }, []);

  const renderChart = () => {
    if (horas && horas !== null) {
      let data = [...horas];
      console.log(data);
      return (
        <Chart
          type="bar"
          height="300"
          options={{
            colors: ["#094f7f", "#f84f10", "#c6c0c1", "#000"],
            xaxis: {
              categories: data.map(({ class_hour }) => class_hour),
            },
            yaxis: {
              labels: {
                formatter: (val) => parseInt(val),
              },
            },
          }}
          series={[
            {
              name: "Capacidad por Horario",
              data: data.map(
                ({ capacity, single_classes }) => capacity / single_classes
              ),
            },
            {
              name: "Reservadas por Horario",
              data: data.map(({ bookings }) => bookings),
            },
            {
              name: "Asistidas por Horario",
              data: data.map(({ attended }) =>
                attended === null ? 0 : attended
              ),
            },
            {
              name: "Clases por Horario",
              data: data.map(({ single_classes }) => single_classes),
            },
          ]}
        />
      );
    }
  };

  const renderChartCapacity = () => {
    if (horas && horas !== null) {
      let data = [...horas];
      return (
        <Chart
          type="bar"
          height="300"
          options={{
            colors: ["#094f7f", "#f84f10", "#c6c0c1", "#000"],
            xaxis: {
              categories: data.map(({ class_hour }) => class_hour),
            },
            yaxis: {
              labels: {
                formatter: (val) => parseInt(val),
              },
            },
            dataLabels: {
              formatter: (val) => `${val}%`,
            },
          }}
          series={[
            {
              name: "Ocupación por Horario",
              data: data.map(
                ({ capacity, bookings }) =>
                  parseFloat(bookings / capacity).toFixed(2) * 100
              ),
            },
          ]}
        />
      );
    }
  };

  const renderReservaciones = () => {
    if (reservaciones && reservaciones !== null) {
      return reservaciones.map((tipo, index) => (
        <div key={index} className="row p-2">
          <div className="col">{tipo.name}</div>
          <div className="col">{tipo.booked}</div>
          <div className="col">{tipo.attended}</div>
        </div>
      ));
    }
  };
  return (
    <div className="container-fluid px-0">
      <h2 className="border-bottom pb-3 mb-3">Reservaciones</h2>
      <div className="card no-scale shadow-sm my-3 p-3">
        <h4 className="border-bottom pb-3 mb-2">Estadísticas por Horario</h4>
        {renderChart()}
      </div>
      <div className="card no-scale shadow-sm my-3 p-3">
        <h4 className="border-bottom pb-3 mb-2">
          Procentaje de Ocupación por Horario
        </h4>
        {renderChartCapacity()}
      </div>
      <div className="row">
        <div className="container-fluid">
          <div className="card p-3 no-scale me-3">
            <h4>Reservaciones por Tipo de Clase</h4>
            <HeaderRow headers={["Nombre", "Reservadas", "Asistidas"]} />
            {renderReservaciones()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasReservaciones;
