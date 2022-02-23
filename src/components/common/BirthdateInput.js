import React, { useState, useEffect } from "react";
import moment from "moment";

const BirthdateInput = ({ value, modifier }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (
      day !== "" &&
      month !== "" &&
      year !== "" &&
      String(year).length === 4
    ) {
      const date = `${year}-${
        String(month).length === 2 ? month : `0${month}`
      }-${String(day).length === 2 ? day : `0${day}`}`;
      if (moment(date).isValid()) {
        modifier(date);
      }
    }
  }, [day, month, year]);

  useEffect(() => {
    let date = moment(value).utc();
    if (date.isValid()) {
      setDay(date.format("DD"));
      setMonth(date.format("MM"));
      setYear(date.format("YYYY"));
    }
  }, []);

  const renderMonths = () => {
    const months = new Array(12).fill(1);
    return months.map((one, index) => (
      <option key={index + 1} value={moment(index + 1, "MM").format("MM")}>
        {moment(index + 1, "MM").format("MMM")}
      </option>
    ));
  };

  return (
    <div className="row mb-3">
      <div className="col-4">
        <input
          type="number"
          className="form-control"
          placeholder="Día (DD)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="col-4">
        <select
          value={month}
          className="form-control mb-3"
          onChange={(e) => setMonth(e.target.value)}
        >
          {renderMonths()}
        </select>
      </div>
      <div className="col-4">
        <input
          type="number"
          className="form-control"
          placeholder="Año (YYYY)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BirthdateInput;
