import api from "./api";

const route = "/users";

export default {
  getAllUsers: () => api.get(`${route}/admin/all`),
  getCurrentUser: () => api.get(route),
  postUser: (user) => api.post(route, { ...user }),
  putUser: (user) => api.put(route, { ...user }),
  deleteUser: (user_id) => api.delete(`${route}/${user_id}`),
};
