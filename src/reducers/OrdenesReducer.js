import { ORDENES_RECIBIDAS, SET_ORDEN } from "../types";

const OrdenesReducer = (state, { type, payload }) => {
  switch (type) {
    case ORDENES_RECIBIDAS:
      return { ...state, purchases: payload };
    case SET_ORDEN:
      return { ...state, purchase: payload };
    default:
      return { ...state };
  }
};

export default OrdenesReducer;
