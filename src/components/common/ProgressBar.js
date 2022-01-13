import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="container-fluid px-0">
      <div className="progress-bar bg-bar"></div>
      <div className="progress-bar fill-bar" style={{ width: `${value}%` }}>
        <span className="small">
          {value}
          {"%"}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
