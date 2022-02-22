import { navigate } from "@reach/router";
import React, { createContext, useContext, useReducer } from "react";
import CheckoutReducer from "../reducers/CheckoutReducer";
import CheckoutService from "../services/CheckoutService";
import {
  HIDE_SPINNER,
  SET_PAQUETE,
  SHOW_SPINNER,
  SHOW_SPINNER_DESCUENTO,
  HIDE_SPINNER_DESCUENTO,
  SET_DESCUENTO,
} from "../types";
import { ModalContext } from "./ModalContext";
import PaquetesService from "../services/PaquetesService";
import DescuentosService from "../services/DescuentosService";

const initialState = {
  paquete: null,
};

export const CheckoutContext = createContext(initialState);

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, initialState);

  const { alert, success } = useContext(ModalContext);

  const setPaquete = (paquete) => {
    dispatch({ type: SET_PAQUETE, payload: paquete });
  };

  const getPaquete = (package_id) => {
    PaquetesService.getPaquete(package_id)
      .then((res) => {
        const { class_package } = res.data;
        dispatch({ type: SET_PAQUETE, payload: class_package });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            alert(
              "Lo sentimos, no encontramos el paquete que quieres comprar."
            );
          }
        }
        alert(error);
      });
  };

  const createOrder = (paquete, paymentMethod, discountCode) => {
    dispatch({ type: SHOW_SPINNER });
    CheckoutService.postCheckout(
      paquete.package_id,
      paymentMethod.payment_source_id,
      discountCode
    )
      .then((res) => {
        const { payment_id } = res.data;
        success("¡Pago exitoso!");
        navigate(`/gracias/${payment_id}`);
        dispatch({ type: HIDE_SPINNER });
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        if (error.response) {
          const { data } = error.response;
          if (data) {
            if (data.details) {
              if (data.details[0]) {
                if (
                  data.details[0].code ===
                  "conekta.errors.processing.charge.card_payment.suspicious_behaviour"
                ) {
                  return alert(
                    "Lo sentimos, nuestro procesador de tarjetas ha rechazado el pago. Comunícate con nosotros."
                  );
                } else if (data.details[0].code.includes("formatted")) {
                  return alert(
                    "El formato de la tarjeta no es válido, revisa los datos que ingresaste por favor."
                  );
                }
              }
            }
          }
          if (error.response.status === 412) {
            return alert(
              "Lo sentimos, se ha alcanzado el límite de personas para este paquete."
            );
          } else if (error.response.status === 409) {
            return alert(
              "Lo sentimos, ya has alcanzado el límite de compras de este paquete."
            );
          }
        }
      });
  };

  const setPayPal = (package_class_id, discountCode) => {
    const paypalButton = document.getElementById("paypal-button");
    if (paypalButton.innerHTML === "") {
      window.paypal.Button.render(
        {
          env: "production",
          payment: (data, actions) => {
            return CheckoutService.postPayPal(package_class_id, discountCode)
              .then((res) => {
                return res.data.orderID;
              })
              .catch((error) => {
                if (error.response) {
                  if (error.response.status === 412) {
                    return alert(
                      "Lo sentimos, se ha alcanzado el límite de personas para este paquete."
                    );
                  } else if (error.response.status === 409) {
                    return alert(
                      "Lo sentimos, ya has alcanzado el límite de compras de este paquete."
                    );
                  }
                }
              });
          },
          onApprove: (data, actions) => {
            return CheckoutService.capturePayPal(data).then(function (res) {
              const { payment_id } = res.data;
              success("¡Pago exitoso!");
              navigate(`/gracias/${payment_id}`);
            });
          },
        },
        "#paypal-button"
      );
    }
  };

  const showSpinner = () => {
    dispatch({ type: SHOW_SPINNER });
  };

  const hideSpinner = () => {
    dispatch({ type: HIDE_SPINNER });
  };

  const setDescuento = (descuento) => {
    dispatch({ type: SET_DESCUENTO, payload: descuento });
  };

  const validarDescuento = (code) => {
    dispatch({ type: SHOW_SPINNER_DESCUENTO });
    DescuentosService.validarDescuento(code)
      .then((res) => {
        const { descuento, error } = res.data;
        if (error) {
          alert(error.message);
        }
        dispatch({ type: SET_DESCUENTO, payload: descuento });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            alert("Lo sentimos, ya has agotado este descuento.");
          }
        }
        alert("Lo sentimos, ese descuento no es válido.");
        dispatch({ type: HIDE_SPINNER_DESCUENTO });
      });
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...state,
        getPaquete,
        setPaquete,
        createOrder,
        showSpinner,
        hideSpinner,
        setPayPal,
        setDescuento,
        validarDescuento,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
