import { getArgs } from "../utils";
import api from "./api";

const route = "/users";

export default {
  getAllUsers: (filters) => api.get(`${route}/admin/all?${getArgs(filters)}`),
  getCurrentUser: () => api.get(route),
  postUser: (email, role) => api.post(route, { email, role }),
  putUser: (user_id, role) => api.put(route, { user_id, role }),
  deleteUser: (user_id) => api.delete(`${route}/${user_id}`),
};
