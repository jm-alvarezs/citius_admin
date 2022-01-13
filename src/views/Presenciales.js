import { Link } from "@reach/router";
import React, { useContext, useEffect } from "react";
import Schedule from "../components/clases/Schedule";
import ClassTypeCard from "../components/classTypes/ClassTypeCard";
import { ClassInstructorContext } from "../context/ClassInstructorContext";
import { ClassTypeContext } from "../context/ClassTypesContext";
import { LocationsContext } from "../context/LocationsContext";
import { ReservationsContext } from "../context/ReservationsContext";
import { UserContext } from "../context/UserContext";

const Presenciales = () => {
  const { user, getUsuario } = useContext(UserContext);

  const { days, getSchedule } = useContext(ClassInstructorContext);

  const { getMyReservations } = useContext(ReservationsContext);

  const { locations, getLocations } = useContext(LocationsContext);

  const { class_types, getClassTypes } = useContext(ClassTypeContext);

  useEffect(() => {
    getUsuario();
    getSchedule();
    getLocations();
    getClassTypes();
    getMyReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTipos = () => {
    if (class_types && class_types !== null) {
      return class_types.map((class_type) => (
        <ClassTypeCard key={class_type.class_type_id} class_type={class_type} />
      ));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-end border-bottom pb-3 mb-4">
        <div className="col col-md-8">
          <h1>Mis Clases Presenciales</h1>
        </div>
        <div className="col col-md-4 text-right">
          <h4>Restantes: {user.available_classes}</h4>
          <Link
            to="/myadmin/reservaciones"
            className="btn btn-link text-secondary"
          >
            Ver Mis Reservaciones
          </Link>
        </div>
      </div>
      <Schedule days={days} locations={locations} />
      <h2 className="border-bottom pb-3 mt-5">Descubre los Tipos de Clases</h2>
      <div className="row">{renderTipos()}</div>
    </div>
  );
};

export default Presenciales;
