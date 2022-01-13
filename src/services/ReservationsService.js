import api from "./api";

const route = "/class_reservations";

const ReservationsService = {
  getMyReservations: () => api.get(route),
  postReservation: (class_reservation) =>
    api.post(route, { ...class_reservation }),
  putReservacion: (class_reservation) =>
    api.put(route, { ...class_reservation }),
  postAttend: (class_reservation_id, attend) =>
    api.post(`${route}/attend/${class_reservation_id}`, { attend }),
  cancelReservation: (class_reservation_id) =>
    api.delete(`${route}/admin/${class_reservation_id}`),
};

export default ReservationsService;
