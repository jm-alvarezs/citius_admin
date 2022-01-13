import React from "react";
import ScheduleClass from "./ScheduleClass";

const ScheduleDay = ({ day, clases }) => {
  const renderSingleClasses = () => {
    if (Array.isArray(clases)) {
      return clases.map((clase) => (
        <ScheduleClass key={clase.single_class_id} singleClass={clase} />
      ));
    }
  };

  return (
    <div
      className={`schedule-col px-0 text-center border bg-light ${
        day.details.length === 0 ? "hide-mobile" : ""
      }`}
    >
      <div className="bg-light px-2">{renderSingleClasses()}</div>
    </div>
  );
};

export default ScheduleDay;
