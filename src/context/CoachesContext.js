import React, { createContext, useReducer, useContext } from "react";
import CoachesReducer from "../reducers/CoachesReducer";
import AdjuntosService from "../services/AdjuntosService";
import CoachesService from "../services/CoachesService";
import {
  COACHES_RECIBIDAS,
  CREATE_COACH,
  SET_COACH,
  SET_PROPIEDAD_COACH,
} from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  coaches: null,
  coach: null,
};

export const CoachesContext = createContext(initialState);

export const CoachesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CoachesReducer, initialState);

  const { success, clearModal } = useContext(ModalContext);

  const getCoaches = () => {
    CoachesService.getCoaches().then((res) => {
      const { instructors } = res.data;
      dispatch({ type: COACHES_RECIBIDAS, payload: instructors });
    });
  };

  const getCoach = (instructor_id) => {
    CoachesService.getSingleCoach(instructor_id).then((res) => {
      const { instructor } = res.data;
      dispatch({ type: SET_COACH, payload: instructor });
    });
  };

  const setCoach = (coach) => {
    dispatch({ type: SET_COACH, payload: coach });
  };

  const createCoach = () => {
    dispatch({ type: CREATE_COACH });
  };

  const setPropiedadCoach = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_COACH, payload: { key, value } });
  };

  const postCoach = (coach) => {
    const handleSuccess = () => {
      clearModal();
      getCoaches();
      hideModal();
      dispatch({ type: SET_COACH, payload: null });
      success("¡Coach guardado!");
    };

    if (isNaN(coach.instructor_id)) {
      if (coach.file && coach.file !== null) {
        const formData = new FormData();
        formData.append("adjunto", coach.file);
        AdjuntosService.postAdjunto(formData).then((res) => {
          const { idAdjunto } = res.data;
          coach.idAdjunto = idAdjunto;
          if (coach.customer) {
            coach.user_id = coach.customer.customer_id;
          }
          CoachesService.postCoach(coach).then(handleSuccess);
        });
      } else {
        if (coach.customer) {
          coach.user_id = coach.customer.customer_id;
        }
        CoachesService.postCoach(coach).then(handleSuccess);
      }
    } else {
      if (coach.file && coach.file !== null) {
        const formData = new FormData();
        formData.append("adjunto", coach.file);
        AdjuntosService.postAdjunto(formData).then((res) => {
          const { idAdjunto } = res.data;
          coach.idAdjunto = idAdjunto;
          if (coach.customer) {
            coach.user_id = coach.customer.customer_id;
          }
          CoachesService.putCoach(coach).then(handleSuccess);
        });
      } else {
        if (coach.customer) {
          coach.user_id = coach.customer.customer_id;
        }
        CoachesService.putCoach(coach).then(handleSuccess);
      }
    }
  };

  const deleteCoach = (instructor_id) => {
    CoachesService.deleteCoach(instructor_id).then(() => {
      hideModal();
      getCoaches();
    });
  };

  return (
    <CoachesContext.Provider
      value={{
        ...state,
        getCoach,
        setCoach,
        postCoach,
        getCoaches,
        createCoach,
        deleteCoach,
        setPropiedadCoach,
      }}
    >
      {children}
    </CoachesContext.Provider>
  );
};
