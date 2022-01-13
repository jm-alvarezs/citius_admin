import api from "./api";

const route = "/analiticas";

const AnaliticasService = {
  getInscritos: () => api.get(`${route}/inscritos`),
  getPaquetes: () => api.get(`${route}/paquetes`),
  getIngresos: () => api.get(`${route}/ingresos`),
  getInstructores: (fecha_inicio, fecha_fin) =>
    api.get(
      `${route}/instructores?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
    ),
  getVideos: () => api.get(`${route}/videos`),
  getReservaciones: () => api.get(`${route}/reservaciones`),
};

export default AnaliticasService;
