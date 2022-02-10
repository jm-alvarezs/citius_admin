import React from "react";
import ScheduleDay from "./ScheduleDay";
import moment from "moment";

const ScheduleWeek = ({ week, location, isHome, filtered }) => {
  const getDetails = (day, time) => {
    const classes = day.details.filter((single_class) => {
      const hour = moment(single_class.class_date).utc().format("HH : mm");
      return hour === time;
    });
    const sorted = classes.sort((a, b) =>
      moment(a.class_date).format("HH:mm") >
      moment(b.class_date).format("HH:mm")
        ? 1
        : -1
    );
    return sorted;
  };

  const renderTime = (index) => {
    const initial = moment().startOf("day");
    const minutes = index * 15;
    initial.add(minutes, "minutes");
    return initial.format("HH : mm");
  };

  const renderRows = () => {
    return new Array(96)
      .fill(1)
      .map((one, index) => {
        const time = renderTime(index);
        const single_classes = week.find((day) => {
          return day.details.find(
            (single_class) =>
              moment(single_class.class_date).utc().format("HH : mm") === time
          );
        });
        if (single_classes) {
          return (
            <div className="row" key={index}>
              <div className="schedule-col time-container text-center bold border-bottom bg-dark text-white py-4">
                <div className="row align-items-center h-100">
                  <span>{renderTime(index)}</span>
                </div>
              </div>
              {week.map((currentDay) => (
                <ScheduleDay
                  key={currentDay.date}
                  day={currentDay}
                  clases={getDetails(currentDay, time)}
                  location={location}
                  isHome={isHome}
                  filtered={filtered}
                />
              ))}
            </div>
          );
        }
        return null;
      })
      .filter((object) => object !== null);
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
          <div key={currentDay.date} className="schedule-col border">
            <div className="row mx-0 pt-2">
              <div className="container-fluid text-center">
                {moment().format("MMM") ===
                  moment(currentDay.date).format("MMM") &&
                  moment(currentDay.date).utc().format("DD")}
              </div>
            </div>
            <div className="row mx-0 my-3 bg-dark text-white">
              <div className="container-fluid text-center">
                {moment().format("MMM") ===
                  moment(currentDay.date).format("MMM") &&
                  moment(currentDay.date).utc().format("dd")}
              </div>
            </div>
          </div>
        ))}
      </div>
      {renderRows()}
    </div>
  );
};

export default ScheduleWeek;
