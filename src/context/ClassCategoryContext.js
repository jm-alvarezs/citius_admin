import { navigate } from "@reach/router";
import React, { createContext, useContext, useReducer } from "react";
import ClassCategoryReducer from "../reducers/ClassCategoryReducer";
import AdjuntosService from "../services/AdjuntosService";
import ClassCategoryService from "../services/ClassCategoryService";
import {
  CLASS_CATEGORIES_RECIBIDAS,
  CLASS_CATEGORY_RECIBIDA,
  CREATE_CATEGORY,
  SET_PROPIEDAD_CATEGORY,
} from "../types";
import { ModalContext } from "./ModalContext";

const initialState = {
  class_categories: null,
  class_category: null,
};

export const ClassCategoryContext = createContext(initialState);

export const ClassCategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClassCategoryReducer, initialState);

  const { success } = useContext(ModalContext);

  const getClassCategories = () => {
    ClassCategoryService.getClassCategories().then((res) => {
      const { class_categories } = res.data;
      dispatch({ type: CLASS_CATEGORIES_RECIBIDAS, payload: class_categories });
    });
  };

  const getAvailableClassCategories = () => {
    ClassCategoryService.getAvailableClassCategories().then((res) => {
      const { class_categories } = res.data;
      dispatch({
        type: CLASS_CATEGORIES_RECIBIDAS,
        payload: class_categories,
      });
    });
  };

  const getClassCategory = (class_category_id) => {
    ClassCategoryService.getClassCategory(class_category_id).then((res) => {
      const { class_category } = res.data;
      dispatch({ type: CLASS_CATEGORY_RECIBIDA, payload: class_category });
    });
  };

  const createClassCategory = () => {
    dispatch({ type: CREATE_CATEGORY });
  };

  const setPropiedadCategory = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_CATEGORY, payload: { key, value } });
  };

  const postClassCategory = (class_category) => {
    if (isNaN(class_category.class_category_id)) {
      if (class_category.file && class_category.file !== null) {
        const formData = new FormData();
        formData.append("adjunto", class_category.file);
        AdjuntosService.postAdjunto(formData).then((res) => {
          const { idAdjunto } = res.data;
          class_category.idAdjunto = idAdjunto;
          ClassCategoryService.postClassCategory(class_category).then(() => {
            getClassCategories();
            success("¡Categoría guardada con éxito!");
            navigate("/myadmin/categorias");
          });
        });
      } else {
        ClassCategoryService.postClassCategory(class_category).then(() => {
          getClassCategories();
          success("¡Categoría guardada con éxito!");
          navigate("/myadmin/categorias");
        });
      }
    } else {
      if (class_category.file && class_category.file !== null) {
        const formData = new FormData();
        formData.append("adjunto", class_category.file);
        AdjuntosService.postAdjunto(formData).then((res) => {
          const { idAdjunto } = res.data;
          class_category.idAdjunto = idAdjunto;
          ClassCategoryService.putClassCategory(class_category).then(() => {
            getClassCategories();
            success("¡Categoría guardada con éxito!");
            navigate("/myadmin/categorias");
          });
        });
      } else {
        ClassCategoryService.putClassCategory(class_category).then(() => {
          getClassCategories();
          success("¡Categoría guardada con éxito!");
          navigate("/myadmin/categorias");
        });
      }
    }
  };

  const deleteClassCategory = (class_category_id) => {
    ClassCategoryService.deleteClassCategory(class_category_id).then(() => {
      success("¡Categoria eliminada con éxito!");
      navigate("../");
      getClassCategories();
    });
  };

  return (
    <ClassCategoryContext.Provider
      value={{
        ...state,
        getClassCategories,
        getClassCategory,
        getAvailableClassCategories,
        postClassCategory,
        createClassCategory,
        setPropiedadCategory,
        deleteClassCategory,
      }}
    >
      {children}
    </ClassCategoryContext.Provider>
  );
};
