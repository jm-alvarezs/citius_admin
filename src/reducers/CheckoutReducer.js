import {
  HIDE_SPINNER,
  HIDE_SPINNER_DESCUENTO,
  SET_DESCUENTO,
  SET_PAQUETE,
  SHOW_SPINNER,
  SHOW_SPINNER_DESCUENTO,
} from "../types";

const CheckoutReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_PAQUETE:
      return { ...state, paquete: payload };
    case SET_DESCUENTO:
      return { ...state, descuento: payload, spinnerDescuento: false };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    case SHOW_SPINNER_DESCUENTO:
      return { ...state, spinnerDescuento: true };
    case HIDE_SPINNER_DESCUENTO:
      return { ...state, spinnerDescuento: false };
    default:
      return { ...state };
  }
};

export default CheckoutReducer;
