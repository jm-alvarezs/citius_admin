import React from "react";
import { formatMonto } from "../../utils";

const PaqueteCard = ({ paquete, action, buttonTitle, className }) => {
  const onSale = () => paquete.sale_price && paquete.sale_price !== null;

  const { title, sale_price, price, short_description, is_special_event } =
    paquete;
  return (
    <div className={"col-12 col-md-6 col-lg-4 my-3"}>
      <div className="vibe-card p-3 package-card shadow-sm no-scale position-relative">
        {sale_price && sale_price !== null && (
          <div className="bg-danger text-white sale-ribbon p-2 px-4 shadow-sm">
            SALE
          </div>
        )}
        <h3 className={is_special_event ? "text-warning" : ""}>{title}</h3>
        <p className="border-bottom pb-2 mb-0">{short_description}</p>
        <div
          className="position-absolute"
          style={{ width: "94%", bottom: "1.2rem" }}
        >
          <p>
            <b>Duración:</b> {paquete.package_days} días
          </p>
          <h4 className="mb-3">
            {onSale() && (
              <span className="strike-through d-inline-block me-3 text-danger">
                {"$"}
                {formatMonto(price)}
              </span>
            )}
            {"$"}
            {formatMonto(onSale() ? sale_price : price)}
            {" MXN"}
          </h4>
          <button
            className={
              className ? className : "btn btn-accent bold btn-block w-100"
            }
            onClick={action}
          >
            {buttonTitle ? buttonTitle : "Comprar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaqueteCard;
