import React from "react";
import moment from "moment";

const ReservacionRow = ({ reservation }) => {
  const getPaymentMethod = (reservacion) => {
    if (reservacion.is_cash) return <i className="fas fa-money-bill"></i>;
  };

  const getStatusReservacion = (reservacion) => {
    if (reservacion.deletedAt !== null) {
      return <span className="text-danger">Cancelada</span>;
    }
    if (reservacion.is_cash) {
      if (!reservacion.is_paid) {
        return <span className="text-danger">Pago en Efectivo Incompleto</span>;
      }
    }
    if (
      !reservacion.attend &&
      moment().isAfter(moment(reservacion.class_date))
    ) {
      return <span className="text-warning">No Asistió</span>;
    }
    if (reservacion.attend) {
      return <span className="text-success">Exitosa</span>;
    }
  };

  const renderInstructors = () => {
    if (
      reservation.class_instructors &&
      reservation.class_instructors !== null
    ) {
      return reservation.class_instructors
        .map(({ instructor }) => instructor.name + " " + instructor.last_name)
        .join(", ");
    }
  };

  return (
    <div className="row my-2">
      <div className="col col-md-3">{reservation.class_type.name}</div>
      <div className="col col-md-2">{renderInstructors()}</div>
      <div className="col col-md-2">
        {moment(reservation.class_date).utc().format("DD MMM HH:mm")}
      </div>
      <div className="col col-md-3">
        {moment(reservation.created_at).format("DD MMM YYYY HH:mm:ss")}
      </div>
      <div className="col col-md-2">
        {getPaymentMethod(reservation)} {getStatusReservacion(reservation)}
      </div>
    </div>
  );
};

export default ReservacionRow;
