import moment from "moment";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { S3_ENDPOINT, formatMonto } from "../../utils";

const CustomerInfo = ({ customer }) => {
  const { user } = useContext(UserContext);

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

  const renderCircuits = () => {
    if (Array.isArray(customer.available_circuits)) {
      return customer.available_circuits.length;
    }
  };

  const { name, last_name, birthdate, email, phone, instagram_account } =
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
              {moment(birthdate).utc().format("DD MMM YYYY")}
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
            {user.role === "admin" && (
              <h4>
                Compras Totales: {"$"}
                {formatMonto(getTotalCompras())} MXN
              </h4>
            )}
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-6">
                  <span className="bold">Clases Disponibles: </span>
                </div>
                <div className="col-6">{renderCustomerClasses()}</div>
              </div>
              <div className="row">
                <div className="col-6">
                  <span className="bold">Circuitos Disponibles: </span>
                </div>
                <div className="col-6">{renderCircuits()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
