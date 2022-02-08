import api from "./api";

const route = "/analytics";

const AnaliticasService = {
  getInscritos: () => api.get(`${route}/customers`),
  getPaquetes: () => api.get(`${route}/purchases`),
  getIngresos: () => api.get(`${route}/income`),
  getInstructores: (fecha_inicio, fecha_fin) =>
    api.get(
      `${route}/instructors?start_date=${fecha_inicio}&end_date=${fecha_fin}`
    ),
  getVideos: () => api.get(`${route}/videos`),
  getMensuales: () => api.get(`${route}/monthly`),
  getReservaciones: () => api.get(`${route}/reservations`),
};

export default AnaliticasService;
