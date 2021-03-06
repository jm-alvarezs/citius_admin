import { Link } from "@reach/router";
import moment from "moment";
import React from "react";

const SingleClassCard = ({ clase }) => {
  const renderInstructors = () => {
    if (clase.class_instructors !== null) {
      if (clase.class_instructors.length > 0) {
        return clase.class_instructors
          .map(({ instructor }) =>
            instructor !== null
              ? instructor.nick_name !== null
                ? instructor.nick_name
                : `${instructor.name} ${instructor.last_name}`
              : "N/D"
          )
          .join(",");
      }
    }
    return "N/D";
  };

  const renderLocation = () => {
    if (clase.location && clase.location !== null) {
      return clase.location.name;
    }
  };

  return (
    <Link to={`./${clase.single_class_id}`} className="no-decoration text-dark">
      <div className="card p-3 shadow-sm no-scale br-0">
        <div className="row">
          <div className="col">
            {moment(clase.class_date).utc().format("ddd DD MMM, HH:mm")}
          </div>
          <div className="col">{renderInstructors()}</div>
          <div className="col">{renderLocation()}</div>
          <div className="col hide-mobile">{clase.capacity}</div>
          <div className="col hide-mobile">{clase.reservations}</div>
          <div className="col show-mobile">
            {clase.reservations} / {clase.capacity}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SingleClassCard;
