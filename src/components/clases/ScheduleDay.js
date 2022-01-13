import React from "react";
import moment from "moment";

const ScheduleDay = ({ day, clases, setDay }) => {
  const renderButton = () => {
    if (clases > 0) {
      return (
        <button onClick={setDay} className="btn btn-round btn-accent">
          {clases}
        </button>
      );
    }
  };

  return (
    <div
      className={`col-sm-1 px-0 text-center my-4 schedule-day border-bottom bg-light ${
        day.details.length === 0 ? "hide-mobile" : ""
      }`}
    >
      <div className="row mx-0">
        <div className="container-fluid text-center">
          {moment(day.date).utc().format("DD")}
        </div>
      </div>
      <div className="row mx-0 my-3 bg-dark text-white">
        <div className="container-fluid text-center">
          {moment(day.date).utc().format("dd")}
        </div>
      </div>
      <div className="class-container px-2">{renderButton()}</div>
    </div>
  );
};

export default ScheduleDay;
