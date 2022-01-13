import React, { createContext, useReducer } from "react";
import AnaliticasReducer from "../reducers/AnaliticasReducer";
import AnaliticasService from "../services/AnaliticasService";
import {
  INSCRITOS_RECIBIDOS,
  INGRESOS_RECBIDOS,
  PAQUETES_RECIBIDOS,
  RESERVATIONS_RECIBIDAS,
  COACHES_RECIBIDAS,
} from "../types";

const initialState = {
  alumnas: null,
  paquetes: null,
  ingresos: null,
};

export const AnaliticasContext = createContext(initialState);

export const AnaliticasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AnaliticasReducer, initialState);

  const getInscritos = () => {
    AnaliticasService.getInscritos().then((res) => {
      dispatch({ type: INSCRITOS_RECIBIDOS, payload: res.data });
    });
  };

  const getPaquetes = () => {
    AnaliticasService.getPaquetes().then((res) => {
      dispatch({ type: PAQUETES_RECIBIDOS, payload: res.data.paquetes });
    });
  };

  const getIngresos = () => {
    AnaliticasService.getIngresos().then((res) => {
      dispatch({ type: INGRESOS_RECBIDOS, payload: res.data });
    });
  };

  const getReservaciones = () => {
    AnaliticasService.getReservaciones().then((res) => {
      dispatch({ type: RESERVATIONS_RECIBIDAS, payload: res.data });
    });
  };

  const getInstructores = (fecha_inicio, fecha_fin) => {
    AnaliticasService.getInstructores(fecha_inicio, fecha_fin).then((res) => {
      const { instructores } = res.data;
      dispatch({ type: COACHES_RECIBIDAS, payload: instructores });
    });
  };

  const clearInstructores = () => {
    dispatch({ type: COACHES_RECIBIDAS, payload: null });
  };

  return (
    <AnaliticasContext.Provider
      value={{
        ...state,
        getPaquetes,
        getIngresos,
        getInscritos,
        getInstructores,
        getReservaciones,
        clearInstructores,
      }}
    >
      {children}
    </AnaliticasContext.Provider>
  );
};
