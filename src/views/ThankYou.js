import React, { useContext, useEffect } from "react";
import { Link } from "@reach/router";
import { PurchasesContext } from "../context/PurchasesContext";
import { formatMonto } from "../utils";
import { UserContext } from "../context/UserContext";
import thankyou_online from "../assets/images/thankyou_online.jpg";
import thankyou_presencial from "../assets/images/thankyou_presencial.jpg";

const ThankYou = ({ payment_id }) => {
  const { user } = useContext(UserContext);
  const { purchase, getPurchase } = useContext(PurchasesContext);

  useEffect(() => {
    if (user !== null) {
      getOrden(payment_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const renderorden = () => {
    if (orden && orden !== null) {
      return (
        <div className="row align-items-center py-4">
          <div className="col col-md-3">
            <h3>{orden.title}</h3>
          </div>
          <div className="col col-md-3">
            <p>{orden.description}</p>
          </div>
          <div className="col col-md-3">
            <h5>
              Total: {"$"}
              {formatMonto(orden.total_payment)}
              {" MXN"}
            </h5>
          </div>
          <div className="col col-md-3">
            <Link to="/myadmin" className="btn btn-primary w-100">
              START NOW!
            </Link>
          </div>
        </div>
      );
    }
    return <div className="spinner-border"></div>;
  };

  const renderImage = () => {
    if (orden && orden !== null) {
      if (orden.is_virtual_class || orden.includes_online_membership) {
        return (
          <img src={thankyou_online} className="mw-100 w-100 d-block m-auto" />
        );
      }
      return (
        <img
          src={thankyou_presencial}
          className="mw-100 w-100 d-block m-auto"
        />
      );
    }
  };

  return (
    <div className="container-fluid bg-dark text-white vh-100 py-5">
      <div className="container">{renderImage()}</div>
      <div className="container">{renderorden()}</div>
    </div>
  );
};

export default ThankYou;
