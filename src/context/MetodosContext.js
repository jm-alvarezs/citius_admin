import React, { createContext, useContext, useReducer } from "react";
import MetodosReducer from "../reducers/MetodosReducer";
import MetodosService from "../services/MetodosService";
import { HIDE_SPINNER, METODOS_RECIBIDOS, SHOW_SPINNER } from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  metodos: null,
  spinner: false,
};

export const MetodosContext = createContext(initialState);

export const MetodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MetodosReducer, initialState);

  const { success, alert } = useContext(ModalContext);

  const getMetodos = () => {
    MetodosService.getMetodos().then((res) => {
      const { metodos_pago } = res.data;
      dispatch({ type: METODOS_RECIBIDOS, payload: metodos_pago });
    });
  };

  const createToken = (
    name,
    number,
    expiration,
    cvc,
    successHandler,
    errorHandler
  ) => {
    const exp_year = expiration.substring(5);
    const exp_month = expiration.substring(0, 2);
    const data = {
      card: {
        number,
        name,
        exp_year,
        exp_month,
        cvc,
      },
    };
    window.Conekta.Token.create(data, successHandler, errorHandler);
  };

  const postMetodoPago = (name, number, expiration, cvc) => {
    dispatch({ type: SHOW_SPINNER });
    createToken(
      name,
      number,
      expiration,
      cvc,
      (token) => {
        const last_digits = number.substring(15);
        const card_type =
          number[0] === "3"
            ? "amex"
            : number[0] === "4"
            ? "visa"
            : "mastercard";
        MetodosService.postMetodoPago(token.id, card_type, last_digits, true)
          .then(() => {
            getMetodos();
            dispatch({ type: HIDE_SPINNER });
            success("¡Método de Pago guardado con éxito!");
            hideModal();
          })
          .catch((error) => {
            dispatch({ type: HIDE_SPINNER });
            alert(error);
          });
      },
      (err) => {
        if (typeof err === "object") {
          err = err.toString();
        }
        dispatch({ type: HIDE_SPINNER });
        alert(err);
      }
    );
  };

  const deleteMetodoPago = (conekta_payment_source_id) => {
    MetodosService.deleteMetodoPago(conekta_payment_source_id).then(() => {
      getMetodos();
      success("Metodo de Pago eliminado con éxito.");
      hideModal();
    });
  };

  return (
    <MetodosContext.Provider
      value={{
        ...state,
        getMetodos,
        createToken,
        postMetodoPago,
        deleteMetodoPago,
      }}
    >
      {children}
    </MetodosContext.Provider>
  );
};
