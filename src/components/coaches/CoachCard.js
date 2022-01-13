import React from "react";
import moment from "moment";

const CoachCard = ({ coach, editCoach, deleteCoach }) => {
  const { name, last_name, birthdate } = coach;
  return (
    <div className="card py-2 px-3 br-0 shadow-sm no-scale">
      <div className="row small align-items-center">
        <div className="col-12 col-md-4">
          {name} {last_name !== null ? last_name : ""}
        </div>
        <div className="col-12 col-md-4">
          {birthdate !== null ? (
            <>
              {moment(birthdate).utc().format("DD MMM YYYY")}
              {moment(birthdate).isSame(moment()) && (
                <i className="fa fa-birthday-cake"></i>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="col-12 col-md-4">
          <button
            className="btn btn-outline-secondary mx-2 btn-sm"
            onClick={() => editCoach(coach)}
          >
            <i className="fa fa-edit"></i> Editar
          </button>
          <button
            className="btn btn-outline-danger mx-2 btn-sm"
            onClick={() => deleteCoach(coach)}
          >
            <i className="fa fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachCard;
