import { RESERVATIONS_RECIBIDAS } from "../types";

const ReservationsReducer = (state, { type, payload }) => {
  switch (type) {
    case RESERVATIONS_RECIBIDAS:
      return { ...state, reservations: payload };
    default:
      return { ...state };
  }
};

export default ReservationsReducer;
