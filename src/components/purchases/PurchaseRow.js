import React, { useContext } from "react";
import { Link } from "@reach/router";
import { formatMonto } from "../../utils";
import moment from "moment";
import { UserContext } from "../../context/UserContext";

const PurchaseRow = ({ purchase }) => {
  const { user } = useContext(UserContext);

  const renderPaymentMethod = () => {
    if (purchase.payment_method && purchase.payment_method !== null) {
      return purchase.payment_method.name;
    }
  };

  const renderClassPackage = () => {
    if (purchase.class_package !== null) {
      return purchase.class_package.title;
    }
  };

  return (
    <div className="row mx-0 hover-light border-bottom py-2 small">
      <div className="col">
        {purchase.purchase_id}{" "}
        {purchase.admin_enabled && <i className="fas fa-user-shield ms-1"></i>}
      </div>
      <div className="col">{renderClassPackage()}</div>
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
        {user.role === "admin" && (
          <span>
            {"$"}
            {formatMonto(purchase.total_payment)}
          </span>
        )}
      </div>
      <div className="col">
        {purchase.status === "revoked" ? (
          <span className="badge badge-pill bg-danger">Revocada</span>
        ) : purchase.status === "cancelled" ? (
          <span className="badge badge-pill bg-danger">Cancelada</span>
        ) : purchase.status === "active" &&
          (purchase.subscription_id === null || purchase.admin_enabled) ? (
          <span className="badge badge-pill bg-success">Pagada</span>
        ) : purchase.status === "active" ? (
          <span className="badge badge-pill bg-success">Activa</span>
        ) : purchase.status === "completed" ? (
          <span className="badge badge-pill bg-success">Completada</span>
        ) : purchase.status === "pending" ? (
          <span className="badge badge-pull bg-warning text-dark">
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
