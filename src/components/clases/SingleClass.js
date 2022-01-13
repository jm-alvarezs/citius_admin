import React, { useState } from "react";
import moment from "moment";
import Switch from "react-switch";
import { BASE_URL } from "../../utils";
import MapaLugares from "./MapaLugares";
import SingleCoach from "../coaches/SingleCoach";

const SingleClass = ({ clase, postReservacion, hideModal }) => {
  const [isGuest, setIsGuest] = useState(false);
  const [guest, setGuest] = useState("");
  const [place, setPlace] = useState(null);

  const renderCoaches = () => {
    if (Array.isArray(clase.class_instructors)) {
      return clase.class_instructors.map((class_instructor) => (
        <SingleCoach
          key={class_instructor.instructor.instructor_id}
          coach={class_instructor.instructor}
        />
      ));
    }
  };

  return (
    <div className="container-fluid px-0">
      <h4 className="mb-1">
        <i className={clase.class_type.icon} /> {clase.class_type.name}
      </h4>
      <h3>{clase.description}</h3>
      <p className="large">
        <i className="far fa-calendar me-2"></i>{" "}
        {moment(clase.class_date).format("DD MMM YYYY")}{" "}
        <i className="far fa-clock mx-2"></i>{" "}
        {moment(clase.class_date).format("HH:mm")} hrs.
      </p>
      <h5 className="mt-4">Coaches</h5>
      {renderCoaches()}
      <h5>Ubicación</h5>
      <p className="large">{clase.location.name}</p>
      <p>{clase.location.address}</p>
      {clase.class_type !== null && clase.class_type.spot_map !== null && (
        <MapaLugares
          place={place}
          setPlace={setPlace}
          rows={clase.class_type.spot_map
            .split(",")
            .map((num) => parseInt(num))}
          icon={clase.icon}
          taken_spots={clase.taken_spots ? clase.taken_spots : []}
        />
      )}
      <div className="row my-3">
        <div className="col-8">
          <p className="large">Asistir como invitado</p>
        </div>
        <div className="col-4 text-end">
          <Switch
            checked={isGuest}
            onChange={(checked) => setIsGuest(checked)}
          />
        </div>
        {isGuest && (
          <div className="container-fluid">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nombre"
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="row">
        <div className="col col-md-6">
          <button
            className="btn btn-accent"
            onClick={() => postReservacion({ ...clase, guest, place })}
          >
            Reservar
          </button>
        </div>
        <div className="col col-md-6 text-right pe-0">
          <button className="btn btn-link text-muted" onClick={hideModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleClass;
