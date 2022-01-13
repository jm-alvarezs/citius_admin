import React, { useState } from "react";
import ScheduleWeek from "./ScheduleWeek";
import moment from "moment";
import ColorLegend from "../global/ColorLegend";

const Schedule = ({ days, locations, isHome }) => {
  const [selected, setSelected] = useState(0);
  const [ubicacion, setUbicacion] = useState("");
  const [filtered, setFiltered] = useState(true);

  const renderDays = () => {
    if (days && days !== null) {
      if (!hasClases()) {
        return (
          <div className="row">
            <p className="px-0 mb-0">No hay clases presenciales programadas.</p>
          </div>
        );
      }
      return (
        <ScheduleWeek
          week={days.slice(selected * 7, selected * 7 + 7)}
          location={ubicacion}
          isHome={isHome}
          filtered={filtered}
        />
      );
    }
  };

  const renderLocations = () => {
    if (Array.isArray(locations)) {
      if (locations.length > 1) {
        return (
          <div className="form-group mb-4">
            <label>Buscar por estudio</label>
            <select
              className="form-control"
              onChange={(e) => setUbicacion(e.target.value)}
            >
              {renderEstudios()}
            </select>
          </div>
        );
      }
    }
  };

  const renderEstudios = () => {
    if (locations && locations !== null) {
      return [
        <option key="all" value="">
          Todos los Estudios
        </option>,
        ...locations.map((location) => (
          <option key={location.location_id} value={location.location_id}>
            {location.name}
          </option>
        )),
      ];
    }
  };

  const hasClases = () => {
    if (days && days !== null) {
      let total = 0;
      days.forEach((day) => {
        total += day.details.length;
      });
      return total > 0;
    }
  };

  const renderMonth = () => {
    if (days && days !== null) {
      return moment(days[0].date).format("MMM");
    }
  };

  return (
    <div className="container-fluid px-0" style={{ overflowX: "hidden" }}>
      <div className="row">
        <div className="col-12 col-xl-2 my-2">
          {renderLocations()}
          <ColorLegend />
        </div>
        <div className="col-12 col-xl-10 my-2">
          <div className="row align-items-center">
            <div className="col-8">
              <h2>{renderMonth()}</h2>
            </div>
            <div className="col-4">
              <select
                className="form-control mb-3"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value={0}>Semana 1</option>
                <option value={1}>Semana 2</option>
                <option value={2}>Semana 3</option>
                <option value={3}>Semana 4</option>
              </select>
            </div>
          </div>
          <div className="container-fluid px-0">{renderDays()}</div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
