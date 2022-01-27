import React from "react";
import { Link } from "@reach/router";
import { formatMonto } from "../../utils";
import moment from "moment";

const InvoiceRow = ({ invoice, customer_id }) => {
  const renderPaymentMethod = () => {
    if (invoice.purchase && invoice.purchase !== null) {
      if (
        invoice.purchase.payment_method &&
        invoice.purchase.payment_method !== null
      ) {
        return invoice.purchase.payment_method.name;
      }
    }
  };

  return (
    <div className="row mx-0 hover-light border-bottom py-2 small">
      <div className="col">{invoice.invoice_id}</div>
      <div className="col">{invoice.purchase_id}</div>
      <div className="col">{invoice.class_package.title}</div>
      {!customer_id && (
        <div className="col">
          <Link to={`/myadmin/customer/${invoice.customer_id}`}>
            {invoice.customer.name} {invoice.customer.last_name}{" "}
          </Link>
        </div>
      )}
      <div className="col">
        {"$"}
        {formatMonto(invoice.total_payment)}
      </div>
      <div className="col">
        {invoice.status === "completed" ? (
          <span className="badge badge-pill bg-success">Completado</span>
        ) : invoice.status === "failed" ? (
          <span className="badge badge-pill bg-warning text-dark">Fallido</span>
        ) : (
          <span className="badge badge-pull bg-secondary text-capitalize">
            {invoice.status}
          </span>
        )}
      </div>
      <div className="col">
        {moment(invoice.createdAt).format("DD MMM YYYY")}
      </div>
      <div className="col">{renderPaymentMethod()}</div>
    </div>
  );
};

export default InvoiceRow;
