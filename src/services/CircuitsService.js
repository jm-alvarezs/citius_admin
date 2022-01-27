import api from "./api";

const route = "/circuits";

export default {
  getCircuits: () => api.get(route),
  postCircuit: (circuit) => api.post(route, { ...circuit }),
  putCircuit: (circuit) => api.put(route, { ...circuit }),
  deleteCircuit: (circuit_id) => api.delete(`${route}/${circuit_id}`),
};
