import api from "./api";

const route = "/discounts";

const DescuentosService = {
  getSingleDescuento: (discount_id) => api.get(`${route}/${discount_id}`),
  validarDescuento: (code) => api.get(`${route}/code/${code}`),
  getDescuentosAdmin: () => api.get(`${route}/admin/all`),
  postDescuento: (descuento) => api.post(route, { ...descuento }),
  putDescuento: (descuento) => api.put(route, { ...descuento }),
  deleteDescuento: (discount_id) => api.delete(`${route}/${discount_id}`),
};

export default DescuentosService;
