import React from "react";
import moment from "moment";

const DateTimeInput = ({ class_date, modifier }) => {
  const handleChangeHour = (hour) => {
    let hourString = String(hour);
    if (hourString.length === 1) {
      hourString = `0${hourString}`;
    } else if (hourString.length > 2) {
      if (hourString[0] === "0") {
        hourString = hourString.substr(1);
      } else {
        hourString = hourString.substr(0, 2);
      }
    }
    if (parseInt(hourString) > 23) hourString = "23";
    if (parseInt(hourString) < 0) hourString = "0";
    const date = class_date.split("T")[0];
    const minutes = class_date.split("T")[1].split(":")[1];
    modifier("class_date", `${date}T${hourString}:${minutes}`);
  };

  //New input

  const handleChangeMinutes = (minutes) => {
    let minuteString = String(minutes);
    if (minuteString.length === 1) {
      minuteString = `0${minuteString}`;
    } else if (minuteString.length > 2) {
      if (minuteString[0] === "0") {
        minuteString = minuteString.substr(1);
      } else {
        minuteString = minuteString.substr(0, 2);
      }
    }
    if (parseInt(minuteString) > 59) minuteString = "23";
    if (parseInt(minuteString) < 0) minuteString = "0";
    const date = class_date.split("T")[0];
    const hours = class_date.split("T")[1].split(":")[0];
    modifier("class_date", `${date}T${hours}:${minuteString}`);
  };

  class_date = class_date ? class_date : moment().format("YYYY-MM-DDTHH:mm");

  return (
    <div className="row mb-3 align-items-center">
      <div className="col-6">
        <label className="mb-1">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={class_date.split("T")[0]}
          onChange={(e) =>
            modifier(
              "class_date",
              `${e.target.value}T${class_date.split("T")[1]}`
            )
          }
        />
      </div>
      <div className="col-6">
        <label className="mb-1">Hora (0h - 23h)</label>
        <div className="row">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              value={class_date.split("T")[1].split(":")[0]}
              onChange={(e) => handleChangeHour(e.target.value)}
              max={23}
              min={0}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              value={class_date.split("T")[1].split(":")[1]}
              max={59}
              min={0}
              onChange={(e) => handleChangeMinutes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeInput;
