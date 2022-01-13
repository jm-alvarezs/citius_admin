import React, { createContext, useReducer } from "react";
import UsersReducer from "../reducers/UsersReducer";
import UserService from "../services/UserService";
import { USERS_RECIBIDOS } from "../types";

const initialState = {
  users: null,
  user: null,
};

export const UsersContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const getUsers = (page) => {
    UserService.getAllUsers(page).then((res) => {
      const { users } = res.data;
      dispatch({ type: USERS_RECIBIDOS, payload: users });
    });
  };

  return (
    <UsersContext.Provider value={{ ...state, getUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
