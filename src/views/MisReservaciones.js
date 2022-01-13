import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import moment from "moment";
import { ClassInstructorContext } from "../context/ClassInstructorContext";
import { ModalContext } from "../context/ModalContext";
import CancelClass from "../components/clases/CancelClass";
import { UserContext } from "../context/UserContext";
import SingleClass from "../components/clases/SingleClass";
import { hideModal } from "../utils";
import { ReservationsContext } from "../context/ReservationsContext";

const MisReservaciones = () => {
  const { user } = useContext(UserContext);
  const {
    reservations,
    getMyReservations,
    cancelReservacion,
    postReservacion,
  } = useContext(ReservationsContext);
  const { modalComponent } = useContext(ModalContext);

  const [filtered, setFiltered] = useState(true);

  useEffect(() => {
    getMyReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPlace = (clase) => {
    modalComponent(
      "Reservar Lugar",
      <SingleClass
        clase={clase}
        postReservacion={postReservacion}
        hideModal={hideModal}
      />
    );
  };

  const confirmCancel = (reservation) => {
    modalComponent(
      "Cancelar Clase",
      <CancelClass
        singleClass={reservation}
        cancelReservacion={cancelReservacion}
      />
    );
  };

  const renderReservaciones = () => {
    if (reservations && reservations !== null) {
      if (reservations.length === 0)
        return (
          <div className="container-fluid px-0">
            <p>Aún no has reservado clases.</p>
            <Link to="/myadmin" className="btn btn-accent bold">
              Ir a Reservar
            </Link>
          </div>
        );
      let reservationsRender = reservations;
      if (filtered) {
        reservationsRender = reservationsRender.filter((reservation) =>
          moment(reservation.class_date)
            .utc()
            .isAfter(moment().utc().subtract(1, "days"))
        );
      }
      return (
        <>
          <div className="row bg-light border mx-0 my-3 py-2 bold hide-mobile">
            <div className="col col-md-2">Nombre</div>
            <div className="col col-md-2">Coach</div>
            <div className="col col-md-2">Fecha y Hora</div>
            <div className="col col-md-2">Reservada en</div>
            <div className="col col-md-2">Posición</div>
            <div className="col col-md-2">Acciones</div>
          </div>
          {reservationsRender.map((reservation) => (
            <div
              key={reservation.class_reservation_id}
              className="card no-scale shadow-sm p-3 my-3"
            >
              <div className="row align-items-center">
                <div className="col-12 col-md-2">
                  {reservation.class_type_name}
                </div>
                <div className="col-12 col-md-2">
                  {reservation.instructor_name}
                </div>
                <div className="col-12 col-md-2">
                  {moment(reservation.class_date)
                    .utc()
                    .format("DD MMM YYYY HH:mm")}
                </div>
                <div className="col-12 col-md-2">
                  {moment(reservation.created_at)
                    .utc()
                    .format("DD MMM YYYY HH:mm")}
                </div>
                <div className="col-12 col-md-2">
                  {reservation.package_id !== null &&
                  (reservation.spot === null || reservation.spot === "") ? (
                    <button
                      className="btn btn-outline-secondary me-3"
                      onClick={() => addPlace(reservation)}
                    >
                      <i className="fa fa-map-pin"></i>
                    </button>
                  ) : (
                    reservation.spot
                  )}
                </div>
                <div className="col-12 col-md-2">
                  {moment(reservation.class_date).diff(moment(), "hours") >
                    6 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => confirmCancel(reservation)}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }
    return <div className="spinner-border"></div>;
  };
  return (
    <div className="container-fluid">
      <div className="row  mb-3">
        <div className="col col-md-6">
          <h1>Mis Reservaciones</h1>
          <p className="mb-0">
            Sólo puedes cancelar clases con 24 horas de anticipación
          </p>
        </div>
        <div className="col col-md-6 text-end">
          <h4>Restantes: {user.available_classes}</h4>
          <button
            className="btn btn-outline-dark me-3"
            onClick={() => setFiltered(!filtered)}
          >
            {filtered ? "Mostrar" : "Ocultar"} Anteriores
          </button>
          <Link to="/myadmin/shop" className="btn btn-dark">
            Comprar Clases
          </Link>
        </div>
      </div>
      {renderReservaciones()}
    </div>
  );
};

export default MisReservaciones;
