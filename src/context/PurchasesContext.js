import React, { createContext, useReducer } from "react";
import OrdenesReducer from "../reducers/OrdenesReducer";
import PurchasesService from "../services/PurchasesService";
import { ORDENES_RECIBIDAS, SET_ORDEN } from "../types";

const initialState = {
  purchases: null,
  purchase: null,
};

export const PurchasesContext = createContext(initialState);

export const PurchaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrdenesReducer, initialState);

  const getPurchases = (start_date, end_date, filters) => {
    PurchasesService.getPurchases(start_date, end_date, filters).then((res) => {
      const { purchases } = res.data;
      dispatch({ type: ORDENES_RECIBIDAS, payload: purchases });
    });
  };

  const getPurchase = (purchase_id) => {
    PurchasesService.getPurchase(purchase_id).then((res) => {
      const { purchase } = res.data;
      dispatch({ type: SET_ORDEN, payload: purchase });
    });
  };

  return (
    <PurchasesContext.Provider value={{ ...state, getPurchase, getPurchases }}>
      {children}
    </PurchasesContext.Provider>
  );
};
