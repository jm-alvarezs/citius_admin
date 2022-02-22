import React from "react";
import ScheduleClass from "./ScheduleClass";
import moment from "moment";

const ScheduleDay = ({ day, clases }) => {
  const renderSingleClasses = () => {
    if (Array.isArray(clases)) {
      if (clases.length === 0) {
        return <p className="show-mobile">Aún no hay clases programadas.</p>;
      }
      return clases.map((clase) => (
        <ScheduleClass key={clase.single_class_id} singleClass={clase} />
      ));
    }
  };

  const renderDay = () => {
    const day_string = moment(day.date).utc().format("dd");
    switch (day_string) {
      case "Tu":
        return "MARTES";
      case "We":
        return "MIÉRCOLES";
      case "Th":
        return "JUEVES";
      case "Fr":
        return "VIERNES";
      case "Sa":
        return "SÁBADO";
      case "Su":
        return "DOMINGO";
      default:
        return "LUNES";
    }
  };

  return (
    <div className={`schedule-col px-0 text-center border bg-light`}>
      <div className="show-mobile">
        <div className="row mx-0 pt-2">
          <div className="container-fluid text-center">
            {moment(day.date).utc().format("DD")}
          </div>
        </div>
        <div className="row mx-0 my-3 bg-dark text-white">
          <div className="container-fluid text-center">{renderDay()}</div>
        </div>
      </div>
      <div className="bg-light px-2">{renderSingleClasses()}</div>
    </div>
  );
};

export default ScheduleDay;
