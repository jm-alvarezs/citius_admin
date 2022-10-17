import React, { useContext, useEffect, useState } from "react";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import { CoachesContext } from "../../context/CoachesContext";
import { LocationsContext } from "../../context/LocationsContext";
import { PackagesContext } from "../../context/PackageContext";
import { ClassTypeContext } from "../../context/ClassTypesContext";
import SelectInstructors from "../global/SelectInstructors";
import DateTimePicker from "../common/DateTimePicker";

const ClaseForm = ({ single_class_id, modifier, confirmDeleteClass }) => {
  const [addLocation, setAddLocation] = useState("");
  const [addCoach, setAddCoach] = useState("");
  const [addType, setAddType] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [coach, setCoach] = useState("");
  const [current_id, setCurrent_id] = useState(null);
  const [first, setFirst] = useState(false);

  const {
    clase,
    clearClase,
    getClase,
    postClase,
    createClase,
    addInstructor,
    removeInstructor,
  } = useContext(ClassInstructorContext);

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
    return () => {
      setFirst(false);
    };
  }, []);

  useEffect(() => {
    if (!first && clase !== null) {
      if (Array.isArray(clase.class_instructors)) {
        if (clase.class_instructors.length > 0) {
          modifier("instructor_id", clase.class_instructors[0].instructor_id);
        }
      }
      setFirst(true);
    }
  }, [clase]);

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
    postClase(clase);
  };

  const renderLocations = () => {
    if (Array.isArray(locations)) {
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
    if (Array.isArray(class_types)) {
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
    if (Array.isArray(paquetes)) {
      return [{ title: "No es evento especial", class_package_id: null }]
        .concat(paquetes)
        .map((paquete) => (
          <option value={paquete.class_package_id}>{paquete.title}</option>
        ));
    }
  };

  const renderForm = () => {
    if (clase && clase !== null) {
      const { description, class_date, class_type_id, capacity, location_id } =
        clase;
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
          <DateTimePicker
            value={class_date}
            modifier={(value) => modifier("class_date", value)}
          />
          <SelectInstructors
            instructors={coaches}
            addInstructor={addInstructor}
            removeInstructor={removeInstructor}
            selected={clase.class_instructors}
          />
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
              <button type="submit" className="btn btn-accent btn-block">
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
                <i className="fa fa-trash me-1"></i> Eliminar
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
