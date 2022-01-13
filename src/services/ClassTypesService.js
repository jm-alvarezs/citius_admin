import api from "./api";

const route = "/class_types";

const ClassTypeService = {
  getClassTypes: () => api.get(route),
  postClassType: (class_type) => api.post(route, { ...class_type }),
  putClassType: (class_type) => api.put(route, { ...class_type }),
  deleteClassType: (class_type_id) => api.delete(`${route}/${class_type_id}`),
};

export default ClassTypeService;
