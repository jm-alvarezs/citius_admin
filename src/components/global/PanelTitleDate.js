import React, { useState, useEffect } from "react";
import moment from "moment";

const PanelTitleDate = ({ title, callback, initialDate }) => {
  const defaultStart = moment().startOf("month").format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(
    initialDate ? initialDate : defaultStart
  );
  const defaultEnd = moment().endOf("month").format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(
    initialDate
      ? moment(initialDate).add(1, "week").format("YYYY-MM-DD")
      : defaultEnd
  );

  useEffect(() => {
    if (typeof callback === "function") {
      callback(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="row mx-0 align-items-center mb-3 pb-3 border-bottom">
      <div className="col col-md-6">
        <h1 className="h2 bold mb-0">{title}</h1>
      </div>
      <div className="col col-md-6text-end">
        <div className="row">
          <div className="col-12 col-md-6">
            <input
              type="date"
              value={startDate}
              className="form-control"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-6">
            <input
              type="date"
              value={endDate}
              className="form-control"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelTitleDate;
