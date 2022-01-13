import React, { createContext, useReducer, useContext } from "react";
import ClassTypesReducer from "../reducers/ClassTypesReducer";
import ClassTypesService from "../services/ClassTypesService";
import {
  CLASS_TYPES_RECIBIDOS,
  CREATE_CLASS_TYPE,
  SET_CLASS_TYPE,
  SET_PROPIEDAD_CLASS_TYPE,
} from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  class_types: null,
  class_type: null,
};

export const ClassTypeContext = createContext(initialState);

export const ClassTypeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClassTypesReducer, initialState);

  const { success } = useContext(ModalContext);

  const getClassTypes = () => {
    ClassTypesService.getClassTypes().then((res) => {
      const { class_types } = res.data;
      dispatch({ type: CLASS_TYPES_RECIBIDOS, payload: class_types });
    });
  };

  const getClassType = (class_type_id) => {
    ClassTypesService.getClassTypes().then((res) => {
      const { class_types } = res.data;
      let class_type = class_types.find(
        (tipo) => parseInt(tipo.class_type_id) === parseInt(class_type_id)
      );
      dispatch({ type: SET_CLASS_TYPE, payload: class_type });
    });
  };

  const postClassType = (class_type) => {
    if (isNaN(class_type.class_type_id)) {
      ClassTypesService.postClassType(class_type).then(() => {
        success("¡Tipo de clase guardado!");
        getClassTypes();
        hideModal();
      });
    } else {
      ClassTypesService.putClassType(class_type).then(() => {
        success("¡Tipo de clase guardado!");
        getClassTypes();
        hideModal();
      });
    }
  };

  const createClassType = () => {
    dispatch({ type: CREATE_CLASS_TYPE });
  };

  const setPropiedadClassType = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_CLASS_TYPE, payload: { key, value } });
  };

  const deleteClassType = (class_type_id) => {
    ClassTypesService.deleteClassType(class_type_id).then(() => {
      success("Tipo de clase eliminado.");
    });
  };

  return (
    <ClassTypeContext.Provider
      value={{
        ...state,
        getClassType,
        getClassTypes,
        postClassType,
        createClassType,
        deleteClassType,
        setPropiedadClassType,
      }}
    >
      {children}
    </ClassTypeContext.Provider>
  );
};
