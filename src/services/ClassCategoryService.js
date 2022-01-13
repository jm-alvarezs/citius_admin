import api from "./api";

const route = "/class_categories";

const ClassCategoryService = {
  getClassCategories: () => api.get(route),
  getClassCategory: (class_category_id) =>
    api.get(`${route}/${class_category_id}`),
  getAvailableClassCategories: () => api.get(`${route}/available`),
  postClassCategory: (class_category) => api.post(route, { ...class_category }),
  putClassCategory: (class_category) => api.put(route, { ...class_category }),
  deleteClassCategory: (class_category_id) =>
    api.delete(`${route}/${class_category_id}`),
};

export default ClassCategoryService;
