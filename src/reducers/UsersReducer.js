import { USERS_RECIBIDOS } from "../types";

const UsersReducer = (state, { type, payload }) => {
  switch (type) {
    case USERS_RECIBIDOS:
      return { ...state, users: payload };
    default:
      return { ...state };
  }
};
export default UsersReducer;
