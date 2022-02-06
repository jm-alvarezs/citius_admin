import moment from "moment";
import {
  CLASES_RECIBIDAS,
  CLASS_TYPES_RECIBIDOS,
  CREATE_CLASE,
  HIDE_SPINNER,
  RESERVATIONS_RECIBIDAS,
  SEMANAS_RECIBIDAS,
  SET_CLASE,
  SET_PROPIEDAD_CLASE,
  SHOW_SPINNER,
  TOTAL_RECIBIDO,
} from "../types";

const schema = {
  class_instructor_id: "nueva",
  description: "",
  instructor_id: "",
  location_id: "",
  class_type_id: "",
  capacity: "",
  class_date: "",
  is_virtual_class: false,
  is_special_event: false,
};

const ClassInstructorReducer = (state, { type, payload }) => {
  switch (type) {
    case SEMANAS_RECIBIDAS:
      return { ...state, days: payload };
    case RESERVATIONS_RECIBIDAS:
      return { ...state, reservations: payload };
    case SET_CLASE:
      return { ...state, clase: payload };
    case SET_PROPIEDAD_CLASE:
      const clase = { ...state.clase };
      const { key, value } = payload;
      clase[key] = value;
      return { ...state, clase };
    case CREATE_CLASE:
      return {
        ...state,
        clase: {
          ...schema,
          class_date: moment().format("YYYY-MM-DDTHH:mm:ss"),
        },
      };
    case CLASS_TYPES_RECIBIDOS:
      return { ...state, class_types: payload };
    case CLASES_RECIBIDAS:
      return { ...state, clases: payload };
    case TOTAL_RECIBIDO:
      return { ...state, total: payload };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    default:
      return { ...state };
  }
};

export default ClassInstructorReducer;
