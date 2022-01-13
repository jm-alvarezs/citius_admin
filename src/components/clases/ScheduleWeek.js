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

  const getDayIndex = () => {
    const date = moment(day.date);
    const current = date.startOf("week");
    let index = 1;
    for (let i = 0; i < 7; i++) {
      if (current.isAfter(date)) {
        index = i + 1;
        break;
      }
      current.add(1, "day");
    }
    index += 1;
    return index;
  };

  const renderSingleClasses = () => {
    if (day !== null) {
      return (
        <div className="bg-light border shadow-sm p-3 mw-100 ">
          <div className="schedule-classes-container">
            {getDetails(day).map((clase) => (
              <ScheduleClass key={clase.single_class_id} singleClass={clase} />
            ))}
          </div>
        </div>
      );
    }
  };
  const renderArrow = () => {
    if (day !== null) {
      return (
        <div
          className="col-7 top-arrow"
          style={{ paddingLeft: `${getDayIndex() * 105}px` }}
        ></div>
      );
    }
  };

  return (
    <div className="row">
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
      {renderArrow()}
      <div className="col-7 px-0 position-relative">
        {renderSingleClasses()}
      </div>
    </div>
  );
};

export default ScheduleWeek;
