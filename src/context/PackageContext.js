import { navigate } from "@reach/router";
import React, { createContext, useContext, useReducer } from "react";
import PaquetesReducer from "../reducers/PaquetesReducer";
import PaquetesService from "../services/PaquetesService";
import {
  CREATE_PAQUETE,
  HIDE_SPINNER,
  PAQUETES_RECIBIDOS,
  RESERVATIONS_RECIBIDAS,
  SET_CLASE,
  SET_PAQUETE,
  SET_PROPIEDAD_PAQUETE,
  SHOW_SPINNER,
} from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  paquetes: null,
  paquete: null,
  spinner: false,
};

export const PackagesContext = createContext(initialState);

export const PaquetesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PaquetesReducer, initialState);

  const { success, alert } = useContext(ModalContext);

  const getPaquetes = () => {
    PaquetesService.getPaquetes().then((res) => {
      const { packages } = res.data;
      dispatch({ type: PAQUETES_RECIBIDOS, payload: packages });
    });
  };

  const getPaquetesEspecialesAdmin = () => {
    PaquetesService.getEventosEspecialesAdmin().then((res) => {
      const { packages } = res.data;
      dispatch({ type: PAQUETES_RECIBIDOS, payload: packages });
    });
  };

  const getAsistentesEspecial = (package_class_id) => {
    PaquetesService.getAsistentesEspecial(package_class_id).then((res) => {
      const { class_package, single_class, asistentes } = res.data;
      dispatch({ type: SET_CLASE, payload: single_class });
      dispatch({ type: RESERVATIONS_RECIBIDAS, payload: asistentes });
      dispatch({ type: SET_PAQUETE, payload: class_package });
    });
  };

  const getPaquetesOnline = () => {
    PaquetesService.getOnline().then((res) => {
      const { packages } = res.data;
      dispatch({ type: PAQUETES_RECIBIDOS, payload: packages });
    });
  };

  const getAllPaquetes = () => {
    PaquetesService.getAllPaquetes().then((res) => {
      const { packages } = res.data;
      dispatch({ type: PAQUETES_RECIBIDOS, payload: packages });
    });
  };

  const getPaqueteAdmin = (package_class_id) => {
    PaquetesService.getPaqueteAdmin(package_class_id).then((res) => {
      const { class_package } = res.data;
      dispatch({ type: SET_PAQUETE, payload: class_package });
    });
  };

  const createPaquete = () => {
    dispatch({ type: CREATE_PAQUETE });
  };

  const setPropiedadPaquete = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_PAQUETE, payload: { key, value } });
  };

  const postPaquete = (paquete) => {
    dispatch({ type: SHOW_SPINNER });
    const callback = () => {
      success("¡Paquete guardado con éxito!");
      navigate("/myadmin/paquetes");
      dispatch({ type: HIDE_SPINNER });
    };
    const handleError = (error) => {
      alert(error);
      dispatch({ type: HIDE_SPINNER });
    };
    if (isNaN(paquete.class_package_id)) {
      PaquetesService.postPaquete(paquete).then(callback).catch(handleError);
    } else {
      PaquetesService.putPaquete(paquete).then(callback).catch(handleError);
    }
  };
  const deletePaquete = (package_id) => {
    PaquetesService.deletePaquete(package_id).then(() => {
      success("¡Paquete eliminado con éxito!");
      getAllPaquetes();
      hideModal();
    });
  };

  const clearPaquetes = () => {
    dispatch({ type: PAQUETES_RECIBIDOS, payload: null });
  };

  return (
    <PackagesContext.Provider
      value={{
        ...state,
        getPaquetes,
        postPaquete,
        deletePaquete,
        createPaquete,
        clearPaquetes,
        getAllPaquetes,
        getPaqueteAdmin,
        getPaquetesOnline,
        setPropiedadPaquete,
        getAsistentesEspecial,
        getPaquetesEspecialesAdmin,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};
