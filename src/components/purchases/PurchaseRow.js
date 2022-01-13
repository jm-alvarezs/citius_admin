import React from "react";
import { Link } from "@reach/router";
import { formatMonto } from "../../utils";
import moment from "moment";

const PurchaseRow = ({ purchase }) => {
  const renderPaymentMethod = () => {
    if (purchase.payment_method && purchase.payment_method !== null) {
      return purchase.payment_method.name;
    }
  };

  return (
    <div className="row mx-0 hover-light border-bottom py-2 small">
      <div className="col">{purchase.purchase_id}</div>
      <div className="col">{purchase.class_package.title}</div>
      <div className="col">
        <Link to={`/myadmin/customer/${purchase.customer_id}`}>
          {purchase.customer.invoices.length === 1 ? (
            <i className="fa fa-star me-2"></i>
          ) : (
            ""
          )}
          {purchase.customer.name} {purchase.customer.last_name}{" "}
        </Link>
      </div>
      <div className="col">
        {"$"}
        {formatMonto(purchase.total_payment)}
      </div>
      <div className="col">
        {purchase.status === "active" ? (
          <span className="badge badge-pill bg-success">Completada</span>
        ) : purchase.status === "pending" ? (
          <span className="badge badge-pill bg-warning text-dark">
            Pendiente
          </span>
        ) : (
          <span className="badge badge-pull bg-secondary text-capitalize">
            {purchase.status}
          </span>
        )}
      </div>
      <div className="col">
        {moment(purchase.createdAt).format("DD MMM YYYY")}
      </div>
      <div className="col">{renderPaymentMethod()}</div>
    </div>
  );
};

export default PurchaseRow;
