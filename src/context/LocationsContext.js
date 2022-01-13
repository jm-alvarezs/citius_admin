import React, { createContext, useReducer } from "react";
import LocationsReducer from "../reducers/LocationsReducer";
import LocationsServices from "../services/LocationsServices";
import {
  CREATE_LOCATION,
  LOCATIONS_RECIBIDAS,
  SET_LOCATION,
  SET_PROPIEDAD_LOCATION,
} from "../types";

const initialState = {
  locations: null,
};

export const LocationsContext = createContext(initialState);

export const LocationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LocationsReducer, initialState);

  const getLocations = () => {
    LocationsServices.getLocations().then((res) => {
      const { locations } = res.data;
      dispatch({ type: LOCATIONS_RECIBIDAS, payload: locations });
    });
  };

  const setLocation = (location) => {
    dispatch({ type: SET_LOCATION, payload: location });
  };

  const createLocation = () => {
    dispatch({ type: CREATE_LOCATION });
  };

  const setPropiedadLocation = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_LOCATION, payload: { key, value } });
  };

  const postLocation = (location) => {
    if (isNaN(location.location_id)) {
      LocationsServices.postLocation(location).then(() => {
        getLocations();
      });
    } else {
      LocationsServices.putLocation(location).then(() => {
        getLocations();
      });
    }
  };

  const deleteLocation = (location_id) => {
    LocationsServices.deleteLocation(location_id).then(() => {
      getLocations();
    });
  };

  return (
    <LocationsContext.Provider
      value={{
        ...state,
        setLocation,
        getLocations,
        postLocation,
        createLocation,
        deleteLocation,
        setPropiedadLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
