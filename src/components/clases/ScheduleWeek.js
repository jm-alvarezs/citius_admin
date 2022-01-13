import React from "react";
import ScheduleDay from "./ScheduleDay";
import moment from "moment";

const ScheduleWeek = ({ week, location, isHome, filtered }) => {
  const getDetails = (day, index) => {
    const classes = day.details.filter((single_class) => {
      const hour = moment(single_class.class_date).utc().hour();
      console.log(hour, index);
      return hour === index;
    });
    console.log(classes);
    const sorted = classes.sort((a, b) =>
      moment(a.class_date).format("HH:mm") >
      moment(b.class_date).format("HH:mm")
        ? 1
        : -1
    );
    return sorted;
  };

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="schedule-col text-center bold border-bottom bg-dark text-white py-4">
          <div className="row align-items-center h-100">
            <span>Horario</span>
          </div>
        </div>
        {week.map((currentDay) => (
          <div className="schedule-col">
            <div className="row mx-0 pt-2">
              <div className="container-fluid text-center">
                {moment(currentDay.date).utc().format("DD")}
              </div>
            </div>
            <div className="row mx-0 my-3 bg-dark text-white">
              <div className="container-fluid text-center">
                {moment(currentDay.date).utc().format("dd")}
              </div>
            </div>
          </div>
        ))}
      </div>
      {new Array(14).fill(1).map((one, index) => (
        <div className="row">
          <div className="schedule-col time-container text-center bold border-bottom bg-dark text-white py-4">
            <div className="row align-items-center h-100">
              <span>{index + 6} : 00</span>
            </div>
          </div>
          {week.map((currentDay) => (
            <ScheduleDay
              key={currentDay.date}
              day={currentDay}
              clases={getDetails(currentDay, index + 6)}
              location={location}
              isHome={isHome}
              filtered={filtered}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScheduleWeek;
