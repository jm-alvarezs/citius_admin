import React from "react";
import { Link } from "@reach/router";
import { formatMonto } from "../../utils";

const CustomerCard = ({ customer, user }) => {
  const { customer_id, name, last_name, email, phone, total } = customer;

  return (
    <Link
      className="card w-100 p-2 hover-light no-scale br-0 text-dark no-decoration"
      to={`/myadmin/customer/${customer_id}`}
    >
      <div className="row w-100 small align-items-center">
        <div className="col col-md-3">
          {name} {last_name}
        </div>
        <div className="col col-md-4">{email}</div>
        <div className="col col-md-3">{phone}</div>
        <div className="col col-md-2">
          {!user.isManager && !user.instructor_id ? (
            <>
              {"$"}
              {formatMonto(total)}
            </>
          ) : (
            "N/D"
          )}
        </div>
      </div>
    </Link>
  );
};

export default CustomerCard;
