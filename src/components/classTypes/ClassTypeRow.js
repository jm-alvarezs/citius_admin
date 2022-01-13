import React from "react";

const ClassTypeRow = ({ category, editClassType, confirmDelete }) => {
  return (
    <div
      key={category.class_category_id}
      className="card p-2 px-3 no-scale shadow-sm br-0"
    >
      <div className="row align-items-center small">
        <div className="col-12 col-md-3">{category.name}</div>
        <div className="col-12 col-md-2">
          <i className={category.icon}></i>
        </div>
        <div className="col-12 col-md-2">
          <div
            className="color-legend"
            style={{ backgroundColor: category.color }}
          ></div>
        </div>
        <div className="col-12 col-md-2">{category.mapa}</div>
        <div className="col-12 col-md-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => editClassType(category.class_type_id)}
          >
            <i className="fa fa-edit me-2"></i> Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm mx-3"
            onClick={() => confirmDelete(category)}
          >
            <i className="fa fa-trash me-2"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassTypeRow;
