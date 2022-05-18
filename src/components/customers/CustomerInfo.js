import { navigate } from "@reach/router";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { S3_ENDPOINT, formatMonto } from "../../utils";

const CustomerInfo = ({ customer, handleAddClasses, handleRevokeClasses }) => {
  const [copied, setCopied] = useState(false);

  const { user, recoverPassword } = useContext(UserContext);

  const { link, getPasswordResetLink } = useContext(CustomerContext);

  const { success } = useContext(ModalContext);

  useEffect(() => {
    if (link !== null) {
      let input = document.createElement("input");
      input.value = link;
      input.id = "copy-input";
      document.body.appendChild(input);
      var copyText = document.getElementById("copy-input");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      navigator.clipboard.writeText(copyText.value).then(() => {
        setCopied(true);
      });
      input.remove();
    }
  }, [link]);

  useEffect(() => {
    if (copied) {
      success("Enlace copiado al portapapeles.");
    }
  }, [copied]);

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

  const {
    customer_id,
    name,
    last_name,
    birthdate,
    email,
    phone,
    instagram_account,
    conditions,
  } = customer;

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-12 col-md-4">
          <img src={getSrc()} className="w-100 profile-image" />
        </div>
        <div className="col-12 col-md-8">
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
          <p className="mb-0 mt-2">
            <b>Condiciones Médicas: </b>
          </p>
          <p> {conditions}</p>
          <div className="row mt-3">
            <div className="container-fluid">
              <button
                className="btn btn-outline-dark me-2 mb-2"
                onClick={() =>
                  navigate(`/myadmin/customer/${customer_id}/edit`)
                }
              >
                <i className="fa fa-edit me-2"></i> Editar Información
              </button>
            </div>
          </div>
          <h4 className="mt-3 mb-2">Reestablecer Contraseña</h4>
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-outline-dark me-2 my-1"
                onClick={() => recoverPassword(customer.email)}
              >
                <i className="fa fa-envelope me-2"></i> Enviar Correo Contraseña
              </button>
              <button
                className="btn btn-outline-dark me-2 my-1"
                onClick={() => getPasswordResetLink(customer.email)}
              >
                <i className="fa fa-link me-2"></i> Generar Link
              </button>
            </div>
            <div className="col-6"></div>
          </div>
          <div className="row mt-4">
            {user.role === "admin" && (
              <h4>
                Compras Totales: {"$"}
                {formatMonto(getTotalCompras())} MXN
              </h4>
            )}
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-6 col-md-3 my-2">
              <span className="bold">Clases Disponibles:</span>{" "}
            </div>
            <div className="col-6 col-md-3 my-2">{renderCustomerClasses()}</div>
            <div className="col-12 my-2">
              <button
                className="btn btn-outline-success btn-sm me-3"
                onClick={handleAddClasses}
              >
                <i className="fa fa-plus"></i> Agregar Clases
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleRevokeClasses}
              >
                <i className="fa fa-minus"></i> Restar Clases
              </button>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-6 col-md-3">
              <span className="bold">Circuitos Disponibles: </span>
            </div>
            <div className="col-6 col-md-3">{renderCircuits()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
