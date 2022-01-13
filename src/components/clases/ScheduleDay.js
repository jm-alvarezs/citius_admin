import React from "react";
import moment from "moment";
import ScheduleClass from "./ScheduleClass";

const ScheduleDay = ({ day, clases, setDay, location }) => {
  const getDetails = (day) => {
    const details =
      location !== null && location !== "" && location
        ? day.details.filter(
            (detail) => parseInt(detail.location_id) === parseInt(location)
          )
        : day.details;
    const sorted = details.sort((a, b) =>
      moment(a.class_date).format("HH:mm") >
      moment(b.class_date).format("HH:mm")
        ? 1
        : -1
    );
    return sorted;
  };

  const renderSingleClasses = () => {
    if (day !== null) {
      return getDetails(day).map((clase) => (
        <ScheduleClass key={clase.single_class_id} singleClass={clase} />
      ));
    }
  };

  return (
    <div
      className={`col-sm-1 px-0 text-center my-4 schedule-day bg-light ${
        day.details.length === 0 ? "hide-mobile" : ""
      }`}
    >
      <div className="row mx-0 pt-2">
        <div className="container-fluid text-center">
          {moment(day.date).utc().format("DD")}
        </div>
      </div>
      <div className="row mx-0 my-3 bg-dark text-white">
        <div className="container-fluid text-center">
          {moment(day.date).utc().format("dd")}
        </div>
      </div>
      <div className="class-container bg-light px-2">
        {renderSingleClasses()}
      </div>
    </div>
  );
};

export default ScheduleDay;
