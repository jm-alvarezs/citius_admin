import { CIRCUITOS_RECIBIDOS } from "../types";

const CircuitReducer = (state, { type, payload }) => {
  switch (type) {
    case CIRCUITOS_RECIBIDOS:
      return { ...state, circuits: payload };
    default:
      return { ...state };
  }
};
export default CircuitReducer;
