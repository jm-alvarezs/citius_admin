import {
  INSCRITOS_RECIBIDOS,
  INGRESOS_RECBIDOS,
  PAQUETES_RECIBIDOS,
  RESERVATIONS_RECIBIDAS,
  COACHES_RECIBIDAS,
  MENSUALES_RECIBIDOS,
} from "../types";

const AnaliticasReducer = (state, { type, payload }) => {
  switch (type) {
    case INSCRITOS_RECIBIDOS:
      return { ...state, ...payload };
    case PAQUETES_RECIBIDOS:
      return { ...state, paquetes: payload };
    case INGRESOS_RECBIDOS:
      return { ...state, ...payload };
    case RESERVATIONS_RECIBIDAS:
      return { ...state, ...payload };
    case COACHES_RECIBIDAS:
      return { ...state, instructores: payload };
    case MENSUALES_RECIBIDOS:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default AnaliticasReducer;
