import moment from "moment";
import React from "react";
import { Link } from "@reach/router";
import { formatMonto } from "../../utils";

const CustomerRow = ({ customer }) => {
  return (
    <div className="row p-2 border-bottom small bg-white mx-0 align-items-center hover-light">
      <div className="col">
        <Link to={`/myadmin/customer/${customer.customer_id}`}>
          <i className="fa fa-eye me-2"></i>
          {customer.name} {customer.last_name}
        </Link>
      </div>
      <div className="col">
        <a
          target="_blank"
          href={`mailto:${customer.email}`}
          className="text-secondary"
        >
          <i className="fa fa-envelope me-2"></i>
          {customer.email}
        </a>
      </div>
      <div className="col">
        <a
          target="_blank"
          href={`https://wa.me/52${customer.phone}`}
          className={
            customer.phone !== null ? "text-success" : "text-secondary"
          }
        >
          <i className="fab fa-whatsapp me-2"></i>
          {customer.phone}
        </a>
      </div>
      <div className="col">
        <i className="fa fa-calendar"></i>{" "}
        {customer.birthdate !== null &&
          moment(customer.birthdate).utc().format("DD MMM YYYY")}
      </div>
      <div className="col">
        {"$"}
        {formatMonto(customer.value)}
      </div>
    </div>
  );
};

export default CustomerRow;
