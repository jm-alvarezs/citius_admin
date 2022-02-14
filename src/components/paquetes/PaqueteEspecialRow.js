import React from "react";
import moment from "moment";
import { Link } from "@reach/router";

const PaqueteEspecialRow = ({ paquete }) => {
  const renderClassDate = () => {
    console.log(paquete);
    if (paquete.single_class && paquete.single_class !== null) {
      return moment(paquete.single_class.class_date).format(
        "DD MMM YYYY HH:mm"
      );
    }
  };

  const { class_package_id, title, customer_limit, purchases } = paquete;
  return (
    <Link
      to={`/myadmin/especiales/${class_package_id}`}
      className="card p-2 hover-light no-scale br-0 no-decoration text-dark"
    >
      <div className="row align-items-center">
        <div className="col">{title}</div>
        <div className="col">{renderClassDate()}</div>
        <div className="col">{customer_limit}</div>
        <div className="col">{purchases.length}</div>
      </div>
    </Link>
  );
};

export default PaqueteEspecialRow;
