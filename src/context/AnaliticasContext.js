import React, { createContext, useReducer } from "react";
import AnaliticasReducer from "../reducers/AnaliticasReducer";
import AnaliticasService from "../services/AnaliticasService";
import {
  INSCRITOS_RECIBIDOS,
  INGRESOS_RECBIDOS,
  PAQUETES_RECIBIDOS,
  RESERVATIONS_RECIBIDAS,
  COACHES_RECIBIDAS,
  MENSUALES_RECIBIDOS,
} from "../types";

const initialState = {
  alumnas: null,
  paquetes: null,
  ingresos: null,
};

export const AnaliticasContext = createContext(initialState);

export const AnaliticasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AnaliticasReducer, initialState);

  const getInscritos = (start_date, end_date) => {
    AnaliticasService.getInscritos(start_date, end_date).then((res) => {
      dispatch({ type: INSCRITOS_RECIBIDOS, payload: res.data });
    });
  };

  const getPaquetes = (start_date, end_date) => {
    AnaliticasService.getPaquetes(start_date, end_date).then((res) => {
      dispatch({ type: PAQUETES_RECIBIDOS, payload: res.data.purchases });
    });
  };

  const getIngresos = (start_date, end_date) => {
    AnaliticasService.getIngresos(start_date, end_date).then((res) => {
      dispatch({ type: INGRESOS_RECBIDOS, payload: res.data });
    });
  };

  const getReservaciones = (start_date, end_date) => {
    AnaliticasService.getReservaciones(start_date, end_date).then((res) => {
      dispatch({
        type: RESERVATIONS_RECIBIDAS,
        payload: {
          reservaciones: res.data.reservations,
          horas: res.data.capacity,
        },
      });
    });
  };

  const getInstructores = (fecha_inicio, fecha_fin) => {
    AnaliticasService.getInstructores(fecha_inicio, fecha_fin).then((res) => {
      const { result } = res.data;
      dispatch({ type: COACHES_RECIBIDAS, payload: result });
    });
  };

  const clearInstructores = () => {
    dispatch({ type: COACHES_RECIBIDAS, payload: null });
  };

  const getMensuales = () => {
    AnaliticasService.getMensuales().then((res) => {
      const { purchases, reservations } = res.data;
      dispatch({
        type: MENSUALES_RECIBIDOS,
        payload: { purchases, reservations },
      });
    });
  };

  return (
    <AnaliticasContext.Provider
      value={{
        ...state,
        getPaquetes,
        getIngresos,
        getInscritos,
        getMensuales,
        getInstructores,
        getReservaciones,
        clearInstructores,
      }}
    >
      {children}
    </AnaliticasContext.Provider>
  );
};
