import React from "react";
import moment from "moment";
import { hideModal } from "../../utils";

const CancelClass = ({ singleClass, reservations, cancelReservacion }) => {
  const getClassReservation = () => {
    if (singleClass) {
      if (singleClass.class_reservation_id) {
        return singleClass.class_reservation_id;
      }
    }
    if (reservations && reservations !== null) {
      const class_reservation = reservations.find(
        (reservation) =>
          parseInt(reservation.class_id) === parseInt(singleClass.class_id)
      );
      if (class_reservation) {
        return class_reservation.class_reservation_id;
      }
    }
  };

  const class_reservation_id = getClassReservation();

  return (
    <div className="container-fluid px-0">
      <p>
        ¿Deseas cancelar tu clase ${singleClass.description} del{" "}
        {moment(singleClass.class_date).format("DD MMM YYYY")} a las{" "}
        {moment(singleClass.class_date).format("HH:mm")}
      </p>
      <div className="row">
        <div className="col col-md-6">
          <button
            className="btn btn-danger"
            onClick={() => cancelReservacion(class_reservation_id)}
          >
            Cancelar Clase
          </button>
        </div>
        <div className="col col-md-6 text-right">
          <button className="btn btn-link text-secondary" onClick={hideModal}>
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelClass;
