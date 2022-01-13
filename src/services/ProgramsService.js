import api from "./api";

const route = "/programs";

export default {
  getPrograms: () => api.get(route),
  getSingleProgram: (url) => api.get(`${route}/${url}`),
};
