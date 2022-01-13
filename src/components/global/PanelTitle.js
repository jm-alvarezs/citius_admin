import React from "react";

const PanelTitle = ({ title, onClick }) => {
  return (
    <div className="row mx-0 align-items-center mb-3 pb-3 border-bottom">
      <div className="col col-md-6 px-0">
        <h1 className="h2 bold mb-0">{title}</h1>
      </div>
      <div className="col col-md-6 px-0 text-end">
        <button className="btn btn-accent" onClick={onClick}>
          + Agregar
        </button>
      </div>
    </div>
  );
};

export default PanelTitle;
