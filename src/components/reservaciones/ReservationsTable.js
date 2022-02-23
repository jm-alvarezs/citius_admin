import React from "react";
import HeaderRow from "../global/HeaderRow";
import ReservacionRow from "./ReservacionRow";

const ReservationsTable = ({ reservations }) => {
  const renderReservaciones = () => {
    if (Array.isArray(reservations)) {
      return reservations.map((reservation) => (
        <ReservacionRow
          key={reservation.class_reservation_id}
          reservation={reservation}
        />
      ));
    }
  };

  return (
    <div className="card shadow-sm no-scale my-3">
      <h3>Reservaciones</h3>
      <HeaderRow headers={["Clase", "Coach", "Fecha", "Status"]} />
      {renderReservaciones()}
    </div>
  );
};

export default ReservationsTable;
