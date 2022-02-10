import React, { createContext, useContext, useReducer } from "react";
import UsersReducer from "../reducers/UsersReducer";
import UserService from "../services/UserService";
import { ModalContext } from "./ModalContext";
import { USERS_RECIBIDOS } from "../types";
import { hideModal } from "../utils";

const initialState = {
  users: null,
  user: null,
};

export const UsersContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const { success } = useContext(ModalContext);

  const getUsers = (page) => {
    UserService.getAllUsers(page).then((res) => {
      const { users } = res.data;
      dispatch({ type: USERS_RECIBIDOS, payload: users });
    });
  };

  const createUser = (email, role) => {
    UserService.postUser(email, role).then(() => {
      getUsers();
      hideModal();
      success("Usuario creado con éxito.");
    });
  };

  const updateUser = (user_id, role) => {
    UserService.putUser(user_id, role).then(() => {
      getUsers();
      hideModal();
      success("Usuario actualizado con éxito.");
    });
  };

  const deleteUser = (user_id) => {
    UserService.deleteUser(user_id).then(() => {
      getUsers();
      hideModal();
      success("Usuario elminado con éxito.");
    });
  };

  return (
    <UsersContext.Provider
      value={{ ...state, getUsers, createUser, updateUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};
