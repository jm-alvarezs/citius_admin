import React, { useState } from "react";
import ScheduleWeek from "./ScheduleWeek";
import moment from "moment";
import ColorLegend from "../global/ColorLegend";

const Schedule = ({ days, locations, isHome }) => {
  const [ubicacion, setUbicacion] = useState("");

  const [filtered, setFiltered] = useState(true);

  const renderdays = () => {
    if (days && days !== null) {
      if (!hasClases()) {
        return (
          <div className="row">
            <p className="px-0 mb-0">No hay clases presenciales programadas.</p>
          </div>
        );
      }
      const weeks = Math.ceil(days.length / 7);
      return new Array(weeks).fill(1).map((one, index) => (
        <div key={index}>
          <ScheduleWeek
            week={days.slice(index * 7, index * 7 + 7)}
            location={ubicacion}
            isHome={isHome}
            filtered={filtered}
          />
        </div>
      ));
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
      <div>
        <div className="row">
          <div className="col-12 col-md-4 my-2">
            <h2 className="border-bottom pb-2 mb-3">{renderMonth()}</h2>
            {renderLocations()}
            <ColorLegend />
          </div>
          <div className="col-12 col-md-8 my-2">
            <div className="container-fluid schedule-container">
              {renderdays()}
            </div>
          </div>
        </div>
        <div className="container-fluid px-0 mt-4">
          <div className="col col-md-6"></div>
          <div className="col col-md-6 text-end"></div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
