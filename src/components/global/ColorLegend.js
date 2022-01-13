import React from "react";

const ColorLegend = () => {
  return (
    <div>
      <h5>Leyenda</h5>
      <div className="row">
        <div className="col-2 col-sm-2">
          <div className="color-legend bg-accent-secondary pe-0"></div>
        </div>
        <div className="col-10 col-sm-10 ps-0">
          <p>Disponible</p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 col-sm-2">
          <div className="color-legend bg-accent pe-0"></div>
        </div>
        <div className="col-10 col-sm-10 ps-0">
          <p>Reservada</p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 col-sm-2">
          <div className="color-legend bg-secondary pe-0"></div>
        </div>
        <div className="col-10 col-sm-10 ps-0">
          <p>Sin lugares</p>
        </div>
      </div>
    </div>
  );
};
export default ColorLegend;
