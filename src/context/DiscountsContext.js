import React, { createContext, useContext, useReducer } from "react";
import DiscountsReducer from "../reducers/DiscountsReducer";
import DescuentosService from "../services/DescuentosService";
import {
  CREATE_DESCUENTO,
  DESCUENTOS_RECIBIDOS,
  SET_DESCUENTO,
  SET_PROPIEDAD_DESCUENTO,
} from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  descuentos: null,
  descuento: null,
};

export const DiscountsContext = createContext(initialState);

export const DiscountsProvider = ({ children }) => {
  const { alert, success } = useContext(ModalContext);

  const [state, dispatch] = useReducer(DiscountsReducer, initialState);

  const getDescuentosAdmin = () => {
    DescuentosService.getDescuentosAdmin().then((res) => {
      const { discounts } = res.data;
      dispatch({ type: DESCUENTOS_RECIBIDOS, payload: discounts });
    });
  };

  const getDescuento = (discount_id) => {
    DescuentosService.getDescuentosAdmin().then((res) => {
      const { discounts } = res.data;
      let index = discounts.findIndex(
        (descuento) => parseInt(descuento.discount_id) === parseInt(discount_id)
      );
      if (index !== -1) {
        return dispatch({ type: SET_DESCUENTO, payload: discounts[index] });
      }
      alert("Descuento no encontrado.");
    });
  };

  const setDescuento = (descuento) => {
    dispatch({ type: SET_DESCUENTO, payload: descuento });
  };

  const createDescuento = () => {
    dispatch({ type: CREATE_DESCUENTO });
  };

  const postDescuento = (descuento) => {
    if (isNaN(descuento.discount_id)) {
      DescuentosService.postDescuento(descuento).then(() => {
        success("¡Descuento guardado!");
        getDescuentosAdmin();
        hideModal();
      });
    } else {
      DescuentosService.putDescuento(descuento).then(() => {
        success("¡Descuento guardado!");
        getDescuentosAdmin();
        hideModal();
      });
    }
  };

  const setPropiedadDescuento = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_DESCUENTO, payload: { key, value } });
  };

  const deleteDescuento = (discount_id) => {
    DescuentosService.deleteDescuento(discount_id).then(() => {
      success("¡Descuento eliminado!");
      getDescuentosAdmin();
      hideModal();
    });
  };

  return (
    <DiscountsContext.Provider
      value={{
        ...state,
        getDescuento,
        setDescuento,
        postDescuento,
        deleteDescuento,
        createDescuento,
        getDescuentosAdmin,
        setPropiedadDescuento,
      }}
    >
      {children}
    </DiscountsContext.Provider>
  );
};
