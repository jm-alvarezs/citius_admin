import {
  CREATE_DESCUENTO,
  DESCUENTOS_RECIBIDOS,
  SET_DESCUENTO,
  SET_PROPIEDAD_DESCUENTO,
} from "../types";

const schema = {
  discount_id: "nuevo",
  title: "",
  code: "",
  description: "",
  amount: "",
  is_percent: true,
  start_date: "",
  expiration_date: "",
  limit_per_customer: "",
  available: true,
};

const DiscountsReducer = (state, { type, payload }) => {
  switch (type) {
    case DESCUENTOS_RECIBIDOS:
      return { ...state, descuentos: payload };
    case SET_DESCUENTO:
      return { ...state, descuento: payload };
    case SET_PROPIEDAD_DESCUENTO:
      const { key, value } = payload;
      const descuento = { ...state.descuento };
      descuento[key] = value;
      return { ...state, descuento };
    case CREATE_DESCUENTO:
      return { ...state, descuento: schema };
    default:
      return { ...state };
  }
};

export default DiscountsReducer;
