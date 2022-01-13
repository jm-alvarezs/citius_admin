import React from "react";
import { BASE_URL } from "../../utils";
import moment from "moment";

const SingleCoach = ({ coach }) => {
  return (
    <div className="container-fluid mb-3">
      <div className="row border p-3 align-items-center">
        <div className="col-3">
          {coach.file_id !== null ? (
            <img
              src={`${BASE_URL}/files/${coach.file_id}`}
              className="thumbnail round mw-100 w-100"
            />
          ) : (
            <div className="thumbnail round bg-accent user-icon">
              <i className="fa fa-user fa-2x"></i>
            </div>
          )}
        </div>
        <div className="col-9">
          <h5>
            {coach.name} {coach.last_name}
          </h5>
          <p>
            {coach.nick_name} -{" "}
            {moment(coach.birthdate).utc().format("DD MMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleCoach;
