import React from "react";
import moment from "moment";
import { Link } from "@reach/router";

const ReservacionRow = ({ reservation }) => {
  const getPaymentMethod = (reservacion) => {
    if (reservacion.is_cash) return <i className="fas fa-money-bill"></i>;
  };

  const getStatusReservacion = (reservacion) => {
    if (reservacion.deletedAt !== null) {
      return <span className="badge bg-danger">Cancelada</span>;
    }
    if (reservacion.single_class === null) {
      return <span className="badge bg-danger">Clase Cancelada</span>;
    }
    if (reservacion.single_class.deletedAt !== null) {
      return <span className="badge bg-danger">Clase Cancelada</span>;
    }
    if (reservacion.is_cash) {
      if (!reservacion.is_paid) {
        return (
          <span className="badge bg-danger">Pago en Efectivo Incompleto</span>
        );
      }
    }
    if (
      !reservacion.attend &&
      moment().isAfter(moment(reservacion.single_class.class_date))
    ) {
      return <span className="badge bg-warning text-dark">No Asistió</span>;
    }
    if (reservacion.attend) {
      return <span className="badge bg-success">Asistió</span>;
    }
  };

  const renderInstructors = () => {
    if (
      reservation.class_instructors &&
      reservation.class_instructors !== null
    ) {
      return reservation.class_instructors
        .map(({ instructor }) => instructor.nick_name)
        .join(", ");
    }
  };

  const renderName = () => {
    const { single_class } = reservation;
    if (single_class && single_class !== null) {
      const { class_type } = single_class;
      if (class_type && class_type !== null) {
        return (
          <Link
            to={`/myadmin/asistentes/${single_class.single_class_id}`}
            className="text-secondary"
          >
            {class_type.name}
          </Link>
        );
      }
    }
  };

  const renderDate = () => {
    const { single_class } = reservation;
    if (single_class && single_class !== null) {
      return moment(single_class.class_date).utc().format("ddd DD MMM, HH:mm");
    }
  };

  return (
    <div className="row mx-0 small border-bottom align-items-center p-1 py-2">
      <div className="col">{renderName()}</div>
      <div className="col">{renderInstructors()}</div>
      <div className="col">{renderDate()}</div>
      <div className="col">
        {getPaymentMethod(reservation)} {getStatusReservacion(reservation)}
      </div>
    </div>
  );
};

export default ReservacionRow;
