import React, { createContext, useContext, useReducer } from "react";
import ClassInstructorReducer from "../reducers/ClassInstructorReducer";
import ClassInstructorService from "../services/ClassInstructorService";
import {
  CREATE_CLASE,
  SEMANAS_RECIBIDAS,
  SET_CLASE,
  SET_PROPIEDAD_CLASE,
  CLASES_RECIBIDAS,
  TOTAL_RECIBIDO,
  SHOW_SPINNER,
  HIDE_SPINNER,
} from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  weeks: null,
  instructorClass: null,
  class_types: null,
  spinner: false,
  clases: null,
  clase: null,
};

export const ClassInstructorContext = createContext(initialState);

export const ClassInstructorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClassInstructorReducer, initialState);

  const { alert, success } = useContext(ModalContext);

  const getClases = (start_date, end_date) => {
    dispatch({ type: SHOW_SPINNER });
    ClassInstructorService.getClases(start_date, end_date).then((res) => {
      const { clases, total } = res.data;
      dispatch({ type: CLASES_RECIBIDAS, payload: clases });
      dispatch({ type: TOTAL_RECIBIDO, payload: total });
      dispatch({ type: HIDE_SPINNER });
    });
  };

  const getAsistentes = (class_instructor_id) => {
    ClassInstructorService.getAsistentes(class_instructor_id).then((res) => {
      const { clase } = res.data;
      dispatch({ type: SET_CLASE, payload: clase });
    });
  };

  const getSchedule = (start_date, end_date) => {
    dispatch({ type: SHOW_SPINNER });
    ClassInstructorService.getWeeks(start_date, end_date)
      .then((res) => {
        const { classes } = res.data;
        dispatch({ type: SEMANAS_RECIBIDAS, payload: classes });
        dispatch({ type: HIDE_SPINNER });
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
      });
  };

  const getClase = (class_instructor_id) => {
    ClassInstructorService.getClase(class_instructor_id).then((res) => {
      const { clase } = res.data;
      dispatch({ type: SET_CLASE, payload: clase });
    });
  };

  const createClase = () => {
    dispatch({ type: CREATE_CLASE });
  };

  const setClase = (clase) => {
    dispatch({ type: SET_CLASE, payload: clase });
  };

  const setPropiedadClase = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_CLASE, payload: { key, value } });
  };

  const postClase = (clase) => {
    if (isNaN(clase.single_class_id)) {
      ClassInstructorService.postClase(clase).then((res) => {
        success("¡Clase guardada con éxito!");
        getSchedule();
        hideModal();
      });
    } else {
      ClassInstructorService.putClase(clase).then((res) => {
        success("¡Clase guardada con éxito!");
        getSchedule();
        hideModal();
      });
    }
  };

  const clearClase = () => {
    dispatch({ type: SET_CLASE, payload: null });
  };

  const eliminarClase = (single_class_id) => {
    ClassInstructorService.deleteClase(single_class_id).then(() => {
      success("¡Clase eliminada con éxito!");
      getSchedule();
      hideModal();
    });
  };

  const postAsistenteClase = (
    customer_id,
    class_instructor_id,
    payment_method_id,
    is_paid
  ) => {
    ClassInstructorService.postAsistenteClase(
      customer_id,
      class_instructor_id,
      payment_method_id,
      is_paid
    )
      .then(() => {
        getAsistentes(class_instructor_id);
        success("¡Asistente agregado!");
        hideModal();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            alert("Lo sentimos, esta clase ya esta llena.");
          }
        }
      });
  };

  const postPayment = (class_reservation_id, is_paid, class_instructor_id) => {
    ClassInstructorService.postPayment(class_reservation_id, is_paid).then(
      () => {
        success(is_paid ? "Pago registrado." : "Pago cancelado.");
        getAsistentes(class_instructor_id);
      }
    );
  };

  return (
    <ClassInstructorContext.Provider
      value={{
        ...state,
        setClase,
        getClase,
        getClases,
        postClase,
        clearClase,
        postPayment,
        getSchedule,
        createClase,
        eliminarClase,
        getAsistentes,
        postAsistenteClase,
        setPropiedadClase,
      }}
    >
      {children}
    </ClassInstructorContext.Provider>
  );
};
