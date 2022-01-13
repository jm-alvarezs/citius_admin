import React from "react";
import { formatMonto } from "../../utils";
import moment from "moment";

const OrdenCard = ({ payment }) => {
  return (
    <div className="card p-3 no-scale my-2">
      <div className="row">
        <div className="col col-md-2">#{payment.payment_id}</div>
        <div className="col col-md-2">{payment.title}</div>
        <div className="col col-md-2">
          {"$"}
          {formatMonto(payment.total_payment)}
          {" MXN"}
        </div>
        <div className="col col-md-3">
          {moment(payment.created_at).format("DD MMM YYYY HH:mm")}
        </div>
        <div className="col col-md-2">{payment.package_days} días</div>
      </div>
    </div>
  );
};

export default OrdenCard;
