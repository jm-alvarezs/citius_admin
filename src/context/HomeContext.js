import React, { createContext, useContext, useReducer } from "react";
import HomeReducer from "../reducers/HomeReducer";
import PaquetesService from "../services/PaquetesService";
import { PRESENCIALES_HOME_RECIBIDOS } from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  presenciales: null,
  coaches: null,
};

export const HomeContext = createContext(initialState);

export const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HomeReducer, initialState);

  const { success } = useContext(ModalContext);

  const getPresenciales = () => {
    PaquetesService.getPresencialesHome().then((res) => {
      const { paquetes } = res.data;
      dispatch({ type: PRESENCIALES_HOME_RECIBIDOS, payload: paquetes });
    });
  };

  const addToHome = (package_class_id, type) => {
    PaquetesService.addToHome(package_class_id, type).then(() => {
      success("¡Paquete agregado al home con éxito!");
      getPresenciales();
      hideModal();
    });
  };

  const deleteFromHome = (package_class_id, type) => {
    PaquetesService.deleteFromHome(package_class_id, type).then(() => {
      success("¡Paquete eliminado del home!");
      getPresenciales();
      hideModal();
    });
  };

  return (
    <HomeContext.Provider
      value={{
        ...state,
        getPresenciales,
        deleteFromHome,
        addToHome,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
