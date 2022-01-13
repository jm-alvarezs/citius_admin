import {
  CREATE_PAQUETE,
  PAQUETES_RECIBIDOS,
  RESERVATIONS_RECIBIDAS,
  SET_PAQUETE,
  SET_PROPIEDAD_PAQUETE,
} from "../types";

const schema = {
  package_class_id: "nuevo",
  title: "",
  short_description: "",
  description: "",
  first_check: "",
  price: "",
  sale_price: null,
  is_special_event: false,
  package_days: null,
  customer_limit: null,
  available: true,
};

const PaquetesReducer = (state, { type, payload }) => {
  switch (type) {
    case PAQUETES_RECIBIDOS:
      return { ...state, paquetes: payload };
    case SET_PAQUETE:
      return { ...state, paquete: payload };
    case SET_PROPIEDAD_PAQUETE:
      const { key, value } = payload;
      const paquete = { ...state.paquete };
      paquete[key] = value;
      return { ...state, paquete };
    case CREATE_PAQUETE:
      return { ...state, paquete: schema };
    case RESERVATIONS_RECIBIDAS:
      return { ...state, asistentes: payload };
    default:
      return { ...state };
  }
};

export default PaquetesReducer;
