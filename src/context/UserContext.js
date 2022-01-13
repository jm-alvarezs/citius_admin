import React, { createContext, useContext, useReducer } from "react";
import AuthService from "../services/AuthService";
import UserReducer from "../reducers/UserReducer";
import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  LOGIN,
  LOGOUT,
  SET_PROPIEDAD_USER,
  GUARDAR_USUARIO,
  EDITAR_USUARIO,
} from "../types";
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";
import UserService from "../services/UserService";

const initialState = {
  user: null,
  correo: null,
  password: null,
  telefono: null,
  cuenta: null,
  direccion: null,
  spinner: false,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const { success, alert } = useContext(ModalContext);

  function signIn(email, password) {
    dispatch({ type: SHOW_SPINNER });
    AuthService.signIn(email, password)
      .then((user) => {
        if (user) {
          UserService.getCurrentUser()
            .then((res) => {
              let { user } = res.data;
              dispatch({
                type: LOGIN,
                payload: user,
              });
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status !== 400) {
                  AuthService.signOut();
                  return alert(error.toString());
                }
              }
              alert(error);
              AuthService.signOut();
            });
        } else {
          alert(
            "Ya tienes cuenta con nosotros pero la contraseña es incorrecta. Por favor, intenta de nuevo"
          );
          dispatch({ type: HIDE_SPINNER });
          AuthService.signOut();
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert(
            "Lo sentimos. No encontramos una cuenta con ese correo. ¡Regístrate!"
          );
        }
        if (error.code === "auth/wrong-password") {
          alert("La contraseña es incorrecta. Por favor, intenta de nuevo");
        } else {
          alert(error.toString());
        }
        dispatch({ type: HIDE_SPINNER });
      });
  }

  function userLoggedIn() {
    dispatch({ type: SHOW_SPINNER });
    AuthService.userLoggedIn(
      (user) => {
        UserService.getCurrentUser()
          .then((res) => {
            let { user } = res.data;
            dispatch({
              type: LOGIN,
              payload: user,
            });
            dispatch({ type: HIDE_SPINNER });
          })
          .catch((error) => {
            alert(error);
            AuthService.signOut();
          });
      },
      (error) => {
        if (error) {
          alert(error);
          AuthService.signOut();
          navigate("/entrar");
        }
        dispatch({ type: HIDE_SPINNER });
      }
    );
  }

  function signOut() {
    AuthService.signOut()
      .then(() => {
        dispatch({ type: LOGOUT });
        navigate("/entrar");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getUsuario() {
    UserService.getCurrentUser().then((res) => {
      const { user } = res.data;
      dispatch({ type: LOGIN, payload: user });
    });
  }

  function editarUsuario() {
    dispatch({ type: EDITAR_USUARIO });
  }

  function cancelEdit() {
    dispatch({ type: GUARDAR_USUARIO });
  }

  function setPropiedadUser(key, value) {
    if (key === "idAdjunto") {
      dispatch({ type: SET_PROPIEDAD_USER, payload: { key: "file", value } });
      if (!value)
        dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
    } else {
      if (key === "telefono") {
        value = String(value).replace(/\D/g, "");
        value = String(value).substring(0, 10);
      }
      dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
    }
  }

  function recoverPassword(email) {
    AuthService.recoverPassword(email).then(() => {
      success("Te hemos enviado un correo para reestablecer tu contraseña.");
    });
  }

  function updateUsuario(usuario) {
    UserService.putUser(usuario)
      .then(() => {
        dispatch({ type: GUARDAR_USUARIO });
        success("Perfil actualizado con éxito.");
      })
      .catch((error) => {
        alert(error);
      });
  }

  const verifyEmail = () => {
    AuthService.verifyEmail().then(() => {
      success("Te enviamos un correo para confirmar tu dirección");
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        getUsuario,
        cancelEdit,
        verifyEmail,
        userLoggedIn,
        updateUsuario,
        editarUsuario,
        recoverPassword,
        setPropiedadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
