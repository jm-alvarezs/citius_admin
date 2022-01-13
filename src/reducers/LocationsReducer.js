import {
  CREATE_LOCATION,
  LOCATIONS_RECIBIDAS,
  SET_LOCATION,
  SET_PROPIEDAD_LOCATION,
} from "../types";

const schema = {
  description: "",
  address: "",
};

const LocationsReducer = (state, { type, payload }) => {
  switch (type) {
    case LOCATIONS_RECIBIDAS:
      return { ...state, locations: payload };
    case SET_LOCATION:
      return { ...state, location: payload };
    case SET_PROPIEDAD_LOCATION:
      const location = { ...state.location };
      const { key, value } = payload;
      location[key] = value;
      return { ...state, location };
    case CREATE_LOCATION:
      return { ...state, location: schema };
    default:
      return { ...state };
  }
};

export default LocationsReducer;
