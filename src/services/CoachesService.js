import api from "./api";

const route = "/instructors";

const CoachesService = {
  getCoaches: () => api.get(`${route}/admin/all`),
  getSingleCoach: (instructor_id) => api.get(`${route}/${instructor_id}`),
  postCoach: (coach) => api.post(route, { ...coach }),
  putCoach: (coach) => api.put(route, { ...coach }),
  deleteCoach: (instructor_id) => api.delete(`${route}/${instructor_id}`),
};

export default CoachesService;
