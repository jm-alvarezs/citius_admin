import { PRESENCIALES_HOME_RECIBIDOS } from "../types";

const HomeReducer = (state, { type, payload }) => {
  switch (type) {
    case PRESENCIALES_HOME_RECIBIDOS:
      return { ...state, presenciales: payload };
    default:
      return { ...state };
  }
};

export default HomeReducer;
