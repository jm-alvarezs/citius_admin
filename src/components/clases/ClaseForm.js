import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import { CoachesContext } from "../../context/CoachesContext";
import { LocationsContext } from "../../context/LocationsContext";
import moment, { utc } from "moment";
import { PackagesContext } from "../../context/PackageContext";
import { ClassTypeContext } from "../../context/ClassTypesContext";

const ClaseForm = ({ single_class_id, modifier, confirmDeleteClass }) => {
  const [addLocation, setAddLocation] = useState("");
  const [addCoach, setAddCoach] = useState("");
  const [addType, setAddType] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [coach, setCoach] = useState("");
  const [current_id, setCurrent_id] = useState(null);

  const { clase, clearClase, getClase, postClase, createClase } = useContext(
    ClassInstructorContext
  );

  const { class_types, getClassTypes } = useContext(ClassTypeContext);

  const { coaches, getCoaches } = useContext(CoachesContext);

  const { locations, getLocations } = useContext(LocationsContext);

  const { paquetes, getAllPaquetes } = useContext(PackagesContext);

  useEffect(() => {
    getAllPaquetes();
    getCurrenClase();
    getClassTypes();
    getLocations();
    getCoaches();
  }, []);

  const getCurrenClase = () => {
    if (isNaN(single_class_id)) {
      createClase();
    } else {
      getClase(single_class_id);
    }
  };

  useEffect(() => {
    if (current_id !== null) {
      if (single_class_id !== current_id) {
        clearClase();
        setCurrent_id(single_class_id);
        getCurrenClase();
      }
    } else {
      setCurrent_id(single_class_id);
    }
  }, [single_class_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addType) {
      clase.class_type_id = "nuevo";
      clase.class_type = {
        name: type,
      };
    }
    if (addCoach) {
      clase.instructor_id = "nueva";
      clase.instructor = {
        first_name: coach,
      };
    }
    if (addLocation) {
      clase.location_id = "nueva";
      clase.location = {
        name: location,
      };
    }
    postClase({
      ...clase,
      class_date: moment(clase.class_date).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const renderCoaches = () => {
    if (coaches && coaches !== null) {
      if (coaches.length > 0 && clase.instructor_id === "") {
        setTimeout(() => {
          modifier("instructor_id", coaches[0].instructor_id);
        }, 100);
      }
      return coaches.map((coach) => (
        <option key={coach.instructor_id} value={coach.instructor_id}>
          {coach.name} {coach.last_name}
        </option>
      ));
    }
  };

  const renderLocations = () => {
    if (locations && locations !== null) {
      if (locations.length > 0 && clase.location_id === "") {
        setTimeout(() => {
          modifier("location_id", locations[0].location_id);
        }, 100);
      }
      return locations.map((location) => (
        <option key={location.location_id} value={location.location_id}>
          {location.name}
        </option>
      ));
    }
  };

  const renderClassTypes = () => {
    if (class_types && class_types !== null) {
      if (class_types.length > 0 && clase.class_type_id === "") {
        setTimeout(() => {
          modifier("class_type_id", class_types[0].class_type_id);
        }, 100);
      }
      return class_types.map((class_type) => (
        <option key={class_type.class_type_id} value={class_type.class_type_id}>
          {class_type.name}
        </option>
      ));
    }
  };

  const renderPaquetes = () => {
    if (paquetes && paquetes !== null) {
      return [{ title: "No es evento especial" }]
        .concat(paquetes)
        .map((paquete) => (
          <option value={paquete.package_id}>{paquete.title}</option>
        ));
    }
  };

  const renderForm = () => {
    if (clase && clase !== null) {
      const {
        description,
        class_date,
        class_type_id,
        capacity,
        instructor_id,
        location_id,
      } = clase;
      return (
        <form onSubmit={handleSubmit}>
          <label>Tipo de Clase</label>
          <div className="row">
            <div className="col col-md-6">
              {addType ? (
                <input
                  type="text"
                  className="form-control mb-3"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              ) : (
                <select
                  className="form-control mb-3"
                  value={class_type_id}
                  defaultValue={class_type_id}
                  onChange={(e) =>
                    modifier("class_type_id", parseInt(e.target.value))
                  }
                >
                  {renderClassTypes()}
                </select>
              )}
            </div>
            <div className="col col-md-6">
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setAddType(!addType);
                }}
              >
                {addType ? "Seleccionar" : "Agregar"} Tipo
              </button>
            </div>
          </div>
          <label>Descripción</label>
          <input
            type="text"
            className="form-control mb-3"
            value={description}
            onChange={(e) => modifier("description", e.target.value)}
          />
          <label>Fecha y Hora</label>
          <DateTimePicker
            onChange={(date) => modifier("class_date", date)}
            value={
              class_date === "" ? class_date : moment(class_date).utc().toDate()
            }
            className="form-control mb-3"
          />
          <label>Coach</label>
          <div className="row">
            <div className="col col-md-6">
              {addCoach ? (
                <input
                  type="text"
                  className="form-control mb-3"
                  value={coach}
                  onChange={(e) => setCoach(e.target.value)}
                />
              ) : (
                <select
                  className="form-control mb-3"
                  value={instructor_id}
                  onChange={(e) =>
                    modifier("instructor_id", parseInt(e.target.value))
                  }
                >
                  {renderCoaches()}
                </select>
              )}
            </div>
            <div className="col col-md-6">
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setAddCoach(!addCoach);
                }}
              >
                {addCoach ? "Seleccionar" : "Agregar"} Coach
              </button>
            </div>
          </div>
          <label>Ubicación</label>
          <div className="row">
            <div className="col col-md-6">
              {addLocation ? (
                <input
                  type="text"
                  className="form-control mb-3"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              ) : (
                <select
                  className="form-control mb-3"
                  value={location_id}
                  onChange={(e) => {
                    modifier("location_id", parseInt(e.target.value));
                  }}
                >
                  {renderLocations()}
                </select>
              )}
            </div>
            <div className="col col-md-6">
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setAddLocation(!addLocation);
                }}
              >
                {addLocation ? "Seleccionar" : "Agregar"} Ubicación
              </button>
            </div>
          </div>
          <label>Capacidad</label>
          <input
            type="number"
            min={0}
            className="form-control mb-3"
            value={capacity}
            onChange={(e) => modifier("capacity", e.target.value)}
          />
          <label>Evento Especial</label>
          <select
            className="form-control mb-3"
            value={clase.package_id}
            onChange={(e) => modifier("package_id", e.target.value)}
          >
            {renderPaquetes()}
          </select>
          <div className="row">
            <div className="col col-md-6">
              <button type="submit" className="btn btn-dark btn-block">
                Guardar
              </button>
            </div>
            <div className="col col-md-6 text-end">
              <button
                className="btn btn-outline-danger"
                onClick={(e) => {
                  e.preventDefault();
                  confirmDeleteClass(clase);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </form>
      );
    }
  };

  return <div className="container-fluid px-0">{renderForm()}</div>;
};

export default ClaseForm;
