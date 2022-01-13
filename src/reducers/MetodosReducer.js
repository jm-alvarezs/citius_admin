import { HIDE_SPINNER, METODOS_RECIBIDOS, SHOW_SPINNER } from "../types";

const MetodosReducer = (state, { type, payload }) => {
  switch (type) {
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    case METODOS_RECIBIDOS:
      return { ...state, metodos: payload };
    default:
      return { ...state };
  }
};

export default MetodosReducer;
