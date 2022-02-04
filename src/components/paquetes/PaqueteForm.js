import { Link } from "@reach/router";
import React from "react";
import Switch from "react-switch";

const PaqueteForm = ({ spinner, paquete, modifier, postPaquete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    postPaquete(paquete);
  };

  const addDefaultPeriod = () => {
    if (
      paquete.is_subscription &&
      (paquete.subscription_period === null ||
        !paquete.subscription_period ||
        paquete.subscription_period === "")
    ) {
      modifier("subscription_period", "month");
    }
  };

  const {
    title,
    short_description,
    description,
    price,
    sale_price,
    available,
    class_amount,
    expiration_days,
  } = paquete;

  return (
    <div className="container-fluid px-0">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-6">
            <label>Disponible</label>
          </div>
          <div className="col-6">
            <Switch
              checked={available}
              onChange={(checked) => modifier("available", checked)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Evento Especial</label>
          </div>
          <div className="col-6">
            <Switch
              checked={paquete.is_special_event}
              onChange={(checked) => modifier("is_special_event", checked)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>¿Es cargo recurrente?</label>
          </div>
          <div className="col-6">
            <Switch
              checked={paquete.is_subscription}
              onChange={(checked) => {
                modifier("is_subscription", checked);
                if (checkeds) addDefaultPeriod();
              }}
            />
          </div>
        </div>
        <label>Nombre</label>
        <input
          type="text"
          className="form-control mb-3"
          value={title}
          onChange={(e) => modifier("title", e.target.value)}
        />
        <label>Descripción Corta</label>
        <input
          type="text"
          className="form-control mb-3"
          value={short_description}
          onChange={(e) => modifier("short_description", e.target.value)}
        />
        <label>Descripción</label>
        <input
          type="text"
          className="form-control mb-3"
          value={description}
          onChange={(e) => modifier("description", e.target.value)}
        />
        <label>Precio</label>
        <input
          type="number"
          className="form-control mb-3"
          value={price}
          onChange={(e) => modifier("price", e.target.value)}
        />
        <label>Precio de Oferta</label>
        <input
          type="text"
          className="form-control mb-3"
          value={sale_price}
          onChange={(e) => modifier("sale_price", e.target.value)}
        />
        <label>Cantidad de Clases Presenciales (Mensual)</label>
        <input
          type="number"
          className="form-control mb-3"
          value={class_amount}
          onChange={(e) => modifier("class_amount", e.target.value)}
        />
        <label>
          {paquete.is_subscription ? "Renovar Clases cada" : "Días de Vigencia"}
        </label>
        <div className="row align-items-center mb-3">
          <div className="col-6 col-md-2">
            <input
              type="number"
              className="form-control"
              value={expiration_days}
              onChange={(e) => modifier("expiration_days", e.target.value)}
            />
          </div>
          <div className="col-6 col-md-10">días</div>
        </div>

        {paquete.is_subscription && (
          <>
            <div className="row">
              <label>Cargar Cada</label>
              <div className="col-12 col-md-2 mb-3">
                <input
                  type="number"
                  className="form-control mb-3"
                  value={paquete.subscription_interval}
                  onChange={(e) =>
                    modifier("subscription_interval", e.target.value)
                  }
                />
              </div>
              <div className="col-12 col-md-10 mb-3">
                <select
                  className="form-control"
                  value={paquete.subscription_period}
                  onChange={(e) =>
                    modifier("subscription_period", e.target.value)
                  }
                >
                  <option value="day">Día(s)</option>
                  <option value="month">Mes(es)</option>
                  <option value="year">Año(s)</option>
                </select>
              </div>
            </div>
            <div className="row">
              <label>Periodo de Prueba Gratis</label>
              <div className="col-12 col-md-2 mb-3">
                <input
                  type="number"
                  className="form-control mb-3"
                  value={paquete.free_trial_length}
                  onChange={(e) =>
                    modifier("free_trial_length", e.target.value)
                  }
                />
              </div>
              <div className="col-12 col-md-10 mb-3">
                <select
                  className="form-control"
                  value={paquete.free_trial_period}
                  onChange={(e) =>
                    modifier("free_trial_period", e.target.value)
                  }
                >
                  <option value="day">Día(s)</option>
                  <option value="month">Mes(es)</option>
                  <option value="year">Año(s)</option>
                </select>
              </div>
            </div>
          </>
        )}
        <label>Límite de Clientes</label>
        <input
          type="number"
          className="form-control mb-3"
          value={paquete.customer_limit}
          placeholder="Dejar en blanco para desactivar"
          onChange={(e) => modifier("customer_limit", e.target.value)}
        />
        <label>Compras por Cliente</label>
        <input
          type="number"
          className="form-control mb-3"
          value={paquete.limit_per_customer}
          placeholder="Dejar en blanco para desactivar"
          onChange={(e) => modifier("limit_per_customer", e.target.value)}
        />
        <div className="row">
          <div className="col-6">
            <button type="submit" className="btn btn-dark">
              {spinner ? <div className="spinner-border"></div> : "Guardar"}
            </button>
          </div>
          <div className="col-6 text-right">
            <Link to="/myadmin/videos" className="btn btn-link text-secondary">
              Cancelar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaqueteForm;
