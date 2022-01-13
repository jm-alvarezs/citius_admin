import api from "./api";

const route = "/metodosPago";

const MetodosService = {
  getMetodos: () => api.get(route),
  deleteMetodoPago: (conekta_payment_source_id) =>
    api.delete(`${route}/${conekta_payment_source_id}`),
  postMetodoPago: (token_id, card_type, last_digits, saveCard) =>
    api.post(route, { token_id, card_type, last_digits, saveCard }),
};

export default MetodosService;
