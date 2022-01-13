import api from "./api";

const route = "/class_packages";

const PaquetesService = {
  getPaquetes: () => api.get(route),
  getPaquete: (class_package_id) => api.get(`${route}/${class_package_id}`),
  getOnline: () => api.get(`${route}/online/all`),
  getPaqueteAdmin: (class_package_id) =>
    api.get(`${route}/admin/${class_package_id}`),
  getAllPaquetes: () => api.get(`${route}/admin/all`),
  getOnlineHome: () => api.get(`${route}/online/home`),
  getPresenciales: () => api.get(`${route}/presenciales/all`),
  getPresencialesHome: () => api.get(`${route}/presenciales/home`),
  getAsistentesEspecial: (package_class_id) =>
    api.get(`${route}/especiales/${package_class_id}/asistentes`),
  getEventosEspecialesHome: () => api.get(`${route}/especiales/home`),
  getEventosAllEspeciales: () => api.get(`${route}/especiales/all`),
  getEventosEspecialesAdmin: () => api.get(`${route}/admin/especiales`),
  getPaquetesEspeciales: () => api.get(`${route}/especiales/all`),
  postPaquete: (paquete) => api.post(route, { ...paquete }),
  putPaquete: (paquete) => api.put(route, { ...paquete }),
  deletePaquete: (class_package_id) =>
    api.delete(`${route}/${class_package_id}`),
};

export default PaquetesService;
