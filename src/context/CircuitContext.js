import React, { createContext, useReducer } from "react";
import CircuitReducer from "../reducers/CircuitReducer";
import CircuitsService from "../services/CircuitsService";
import { CIRCUITOS_RECIBIDOS } from "../types";

const initialState = {
  circuits: null,
};

export const CircuitContext = createContext(initialState);

export const CircuitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CircuitReducer, initialState);

  const getCircuits = () => {
    CircuitsService.getCircuits().then((res) => {
      const { circuits } = res.data;
      dispatch({ type: CIRCUITOS_RECIBIDOS, payload: circuits });
    });
  };

  return (
    <CircuitContext.Provider value={{ ...state, getCircuits }}>
      {children}
    </CircuitContext.Provider>
  );
};
