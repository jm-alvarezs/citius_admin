import api from "./api";

const route = "/analytics";

const AnaliticasService = {
  getInscritos: (start_date, end_date) =>
    api.get(`${route}/customers?start_date=${start_date}&end_date=${end_date}`),
  getPaquetes: (start_date, end_date) =>
    api.get(`${route}/purchases?start_date=${start_date}&end_date=${end_date}`),
  getIngresos: (start_date, end_date) =>
    api.get(`${route}/income?start_date=${start_date}&end_date=${end_date}`),
  getInstructores: (fecha_inicio, fecha_fin) =>
    api.get(
      `${route}/instructors?start_date=${fecha_inicio}&end_date=${fecha_fin}`
    ),
  getVideos: () => api.get(`${route}/videos`),
  getMensuales: () => api.get(`${route}/monthly`),
  getReservaciones: (start_date, end_date) =>
    api.get(
      `${route}/reservations?start_date=${start_date}&end_date=${end_date}`
    ),
};

export default AnaliticasService;
