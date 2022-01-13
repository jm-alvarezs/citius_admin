import React, { createContext, useContext, useReducer } from "react";
import ReservationsReducer from "../reducers/ReservationsReducer";
import ReservationsService from "../services/ReservationsService";
import { RESERVATIONS_RECIBIDAS } from "../types";
import { hideModal } from "../utils";
import { ClassInstructorContext } from "./ClassInstructorContext";
import { ModalContext } from "./ModalContext";

const initialState = {
  reservations: null,
  reservation: null,
  updated: false,
};

export const ReservationsContext = createContext(initialState);

export const ReservationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReservationsReducer, initialState);

  const { success } = useContext(ModalContext);

  const { getAsistentes } = useContext(ClassInstructorContext);

  const getMyReservations = () => {
    ReservationsService.getMyReservations().then((res) => {
      const { reservations } = res.data;
      dispatch({ type: RESERVATIONS_RECIBIDAS, payload: reservations });
    });
  };

  const cancelReservacion = (class_reservation_id, callback) => {
    ReservationsService.cancelReservacion(class_reservation_id)
      .then(() => {
        hideModal();
        success("¡Reservación cancelada con éxito!");
        if (typeof callback === "function") {
          callback();
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            hideModal();
            alert(
              "Lo sentimos, para cancelar tu clase necesitas al menos 6 horas de anticipación."
            );
          }
        }
        if (typeof callback === "function") {
          callback();
        }
      });
  };

  const postReservacion = (clase, callback) => {
    let service;
    if (clase.class_reservation_id) {
      service = ReservationsService.putReservacion(clase);
    } else {
      service = ReservationsService.postReservacion(clase);
    }
    service
      .then(() => {
        hideModal();
        success("¡Reservación guardada con éxito!");
        if (typeof callback === "function") {
          callback();
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            return alert(
              "Lo sentimos, ya no tienes créditos vigentes para clases presenciales."
            );
          } else if (error.response.status === 409) {
            return alert(
              "Ya has reservado esta clase, refresca la página para verlo reflejado."
            );
          }
        }
        if (typeof callback === "function") {
          callback();
        }
      });
  };

  const postAttend = (class_reservation_id, attend, single_class_id) => {
    ReservationsService.postAttend(class_reservation_id, attend).then(() => {
      success(attend ? "Asistencia registrada." : "Asistencia cancelada");
      getAsistentes(single_class_id);
    });
  };

  const updateGuestName = (class_reservation_id, name) => {
    ReservationsService.updateGuestName(class_reservation_id, name).then(() => {
      success("¡Nombre actualizado!");
    });
  };

  const eliminarReservacion = (class_reservation_id, callback) => {
    ReservationsService.cancelReservation(class_reservation_id).then(() => {
      success("¡Reservacion eliminada!");
      if (typeof callback === "function") {
        callback();
      }
      hideModal();
    });
  };

  return (
    <ReservationsContext.Provider
      value={{
        ...state,
        postAttend,
        postReservacion,
        updateGuestName,
        cancelReservacion,
        getMyReservations,
        eliminarReservacion,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};
