import {
  COACHES_RECIBIDAS,
  CREATE_COACH,
  SET_COACH,
  SET_PROPIEDAD_COACH,
} from "../types";

const schema = {
  instructor_id: "nueva",
  first_name: "",
  last_name: "",
  birthday: "",
  nick_name: "",
  idAdjunto: null,
};

const CoachesReducer = (state, { type, payload }) => {
  switch (type) {
    case COACHES_RECIBIDAS:
      return { ...state, coaches: payload, coach: null };
    case SET_COACH:
      return { ...state, coach: payload };
    case SET_PROPIEDAD_COACH:
      const coach = { ...state.coach };
      const { key, value } = payload;
      coach[key] = value;
      return { ...state, coach };
    case CREATE_COACH:
      return { ...state, coach: schema };
    default:
      return { ...state };
  }
};

export default CoachesReducer;
