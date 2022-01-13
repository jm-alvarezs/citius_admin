import moment from "moment";
import React from "react";
import { S3_ENDPOINT, formatMonto } from "../../utils";

const CustomerInfo = ({ customer }) => {
  const getTotalCompras = () => {
    let total = 0;
    if (customer.purchases) {
      customer.purchases.forEach((purchase) => {
        if (!purchase.is_gift) {
          total += parseFloat(purchase.total_payment);
        }
      });
    }
    return total;
  };

  const renderCustomerClasses = () => {
    if (Array.isArray(customer.available_classes)) {
      return customer.available_classes.length;
    }
  };

  const getSrc = () => {
    if (customer.file && customer.file !== null) {
      return `${S3_ENDPOINT}/files/${customer.file.name}.${customer.file.type}`;
    }
  };

  const { name, last_name, birthday, email, phone, instagram_account } =
    customer;

  return (
    <>
      <div className="row">
        <div className="col col-md-4">
          <img src={getSrc()} className="w-100 profile-image" />
        </div>
        <div className="col col-md-8">
          <h4 className="mb-3 pb-3 border-bottom">
            {name} {last_name}
          </h4>
          <div className="row">
            <div className="col-1">
              <i className="fa fa-birthday-cake"></i>
            </div>
            <div className="col-11">
              {moment(birthday).add(1, "day").format("DD MMM YYYY")}
            </div>
          </div>
          <div className="row">
            <div className="col-1">
              <i className="fa fa-envelope"></i>
            </div>
            <div className="col-11">{email}</div>
          </div>
          <div className="row">
            <div className="col-1">
              <i className="fa fa-phone"></i>
            </div>
            <div className="col-11">{phone}</div>
          </div>
          <div className="row">
            <div className="col-1">@</div>
            <div className="col-11">{instagram_account}</div>
          </div>
          <div className="row mt-4">
            <h4>
              Compras Totales: {"$"}
              {formatMonto(getTotalCompras())} MXN
            </h4>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-6">
                  <span className="bold">Disponibles: </span>
                </div>
                <div className="col-6">{renderCustomerClasses}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
