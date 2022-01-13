import api from "./api";

const route = "/single_class";

const ClassInstructorService = {
  getWeeks: () => api.get(route),
  getClase: (single_class_id) => api.get(`${route}/single/${single_class_id}`),
  getClases: (startDate, endDate) =>
    api.get(`${route}/admin?start_date=${startDate}&end_date=${endDate}`),
  getMyReservations: () => api.get(`${route}/myreservations`),
  getAsistentes: (single_class_id) =>
    api.get(`${route}/admin/${single_class_id}`),
  postReservacion: (clase) => api.post(`${route}/reservation`, { ...clase }),
  putReservacion: (clase) => api.put(`${route}/reservation`, { ...clase }),
  cancelReservacion: (class_reservation_id) =>
    api.delete(`${route}/${class_reservation_id}`),
  postClase: (clase) => api.post(route, { ...clase }),
  putClase: (clase) => api.put(route, { ...clase }),
  postAttend: (class_reservation_id, attend) =>
    api.post(`${route}/attend`, { class_reservation_id, attend }),
  postPayment: (class_reservation_id, is_paid) =>
    api.post(`${route}/payment`, { class_reservation_id, is_paid }),
  postAsistenteClase: (
    customer_id,
    single_class_id,
    payment_method_id,
    is_paid
  ) =>
    api.post(`${route}/asistente`, {
      customer_id,
      single_class_id,
      payment_method_id,
      is_paid,
    }),
  updateGuestName: (class_reservation_id, name) =>
    api.put(`${route}/guest`, { class_reservation_id, name }),
  deleteClase: (single_class_id) => api.delete(`${route}/${single_class_id}`),
  deleteAsistente: (class_reservation_id) =>
    api.delete(`${route}/asistente/${class_reservation_id}`),
};

export default ClassInstructorService;
