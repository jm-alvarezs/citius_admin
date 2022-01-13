import React, { useState } from "react";
import ScheduleDay from "./ScheduleDay";
import ScheduleClass from "./ScheduleClass";
import moment from "moment";

const ScheduleWeek = ({ week, location, isHome, filtered }) => {
  const [day, setDay] = useState(null);

  const getDetails = (day) => {
    const details =
      location !== null && location !== ""
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

  return (
    <div className="row">
      <div className="col-1 col-xl-1 pt-4">
        <div className="py-4 text-center bg-dark text-white py-4">Horario</div>
        {new Array(14).fill(1).map((one, index) => (
          <div className="time-container bg-light py-4">{index + 6} : 00</div>
        ))}
      </div>
      <div className="col-11 col-xl-11">
        <div className="row h-100">
          {week.map((currentDay, index) => (
            <ScheduleDay
              key={index}
              day={currentDay}
              clases={getDetails(currentDay).length}
              location={location}
              isHome={isHome}
              filtered={filtered}
              setDay={() => {
                if (day !== null) {
                  if (day.date === currentDay.date) {
                    return setDay(null);
                  }
                }
                setDay(currentDay);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleWeek;
