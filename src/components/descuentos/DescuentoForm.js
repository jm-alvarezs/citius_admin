import React, { useContext, useEffect, useState } from "react";
import { DiscountsContext } from "../../context/DiscountsContext";
import Switch from "react-switch";
import { hideModal } from "../../utils";
import moment from "moment";

const DescuentoForm = ({ discount_id }) => {
  const [type, setType] = useState(1);
  const {
    descuento,
    getDescuento,
    createDescuento,
    postDescuento,
    setPropiedadDescuento,
  } = useContext(DiscountsContext);

  useEffect(() => {
    if (isNaN(discount_id)) {
      createDescuento();
    } else {
      getDescuento(discount_id);
    }
  }, [discount_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postDescuento({ ...descuento, isPercent: type === 1 });
  };

  const renderForm = () => {
    if (descuento && descuento !== null) {
      const {
        code,
        description,
        start_date,
        expiration_date,
        available,
        amount,
        limit_per_customer,
        first_invoice_only,
        first_purchase_only,
      } = descuento;
      return (
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-6">Disponible</div>
            <div className="col-6 text-end">
              <Switch
                checked={available}
                onChange={(checked) =>
                  setPropiedadDescuento("available", checked)
                }
              />
            </div>
          </div>
          <label>Código</label>
          <input
            type="text"
            className="form-control mb-3"
            value={code}
            onChange={(e) => setPropiedadDescuento("code", e.target.value)}
          />
          <label>Descripción</label>
          <input
            type="text"
            className="form-control mb-3"
            value={description}
            onChange={(e) =>
              setPropiedadDescuento("description", e.target.value)
            }
          />
          <label>Tipo de Descuento</label>
          <select
            className="form-control mb-3"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPropiedadDescuento("is_percent", e.target.value === 1);
            }}
          >
            <option value="1">Porcentaje (%)</option>
            <option value="0">Cantidad Fija ($)</option>
          </select>
          <label>Cantidad</label>
          <input
            type="number"
            className="form-control mb-3"
            value={amount}
            onChange={(e) => setPropiedadDescuento("amount", e.target.value)}
          />
          <label>Fecha Inicio</label>
          <input
            type="date"
            className="form-control mb-3"
            value={moment(start_date).utc().format("YYYY-MM-DD")}
            onChange={(e) =>
              setPropiedadDescuento("start_date", e.target.value)
            }
          />
          <label>Fecha Fin</label>
          <input
            type="date"
            className="form-control mb-3"
            value={moment(expiration_date).utc().format("YYYY-MM-DD")}
            onChange={(e) =>
              setPropiedadDescuento("expiration_date", e.target.value)
            }
          />
          <label>Cantidad por Cliente</label>
          <input
            type="number"
            className="form-control mb-3"
            value={limit_per_customer}
            onChange={(e) =>
              setPropiedadDescuento("limit_per_customer", e.target.value)
            }
          />
          <div className="row mb-3">
            <div className="col-6">Sólo para primer pago</div>
            <div className="col-6 text-end">
              <Switch
                checked={first_invoice_only}
                onChange={(checked) =>
                  setPropiedadDescuento("first_invoice_only", checked)
                }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">Sólo para clientes nuevos</div>
            <div className="col-6 text-end">
              <Switch
                checked={first_purchase_only}
                onChange={(checked) =>
                  setPropiedadDescuento("first_purchase_only", checked)
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <button type="submit" className="btn btn-dark w-100 mt-2">
                Guardar
              </button>
            </div>
            <div className="col-6 text-right">
              <button
                className="btn btn-link text-secondary mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  hideModal();
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      );
    }
  };

  return <div className="container-fluid px-0">{renderForm()}</div>;
};

export default DescuentoForm;
