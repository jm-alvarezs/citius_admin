import React, { useEffect, useContext } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import LocationForm from "../../components/locations/LocationForm";
import { LocationsContext } from "../../context/LocationsContext";
import { ModalContext } from "../../context/ModalContext";

const AdminLocations = () => {
  const {
    locations,
    setLocation,
    getLocations,
    createLocation,
    postLocation,
    deleteLocation,
    setPropiedadLocation,
  } = useContext(LocationsContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getLocations();
  }, []);

  const editLocation = (location) => {
    setLocation(location);
    modalComponent(
      "Editar Ubicación",
      <LocationForm
        modifier={setPropiedadLocation}
        postLocation={postLocation}
      />
    );
  };

  const addLocation = () => {
    createLocation();
    modalComponent(
      "Agregar Ubicación",
      <LocationForm
        modifier={setPropiedadLocation}
        postLocation={postLocation}
      />
    );
  };

  const confirmDelete = (location) => {
    modalComponent(
      "Cuidado",
      <div className="container-fluid px-0">
        <p>
          ¿Estás segura que deseas eliminar la ubicación {location.description}?
          Esta acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteLocation(location.location_id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderUbicaciones = () => {
    if (locations && locations !== null) {
      return locations.map((location) => (
        <div className="card p-2 no-scale">
          <div className="row">
            <div className="col">{location.name}</div>
            <div className="col">{location.address}</div>
            <div className="col">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => editLocation(location)}
              >
                <i className="fa fa-edit"></i> Editar
              </button>
              <button
                className="btn btn-sm btn-outline-danger mx-3"
                onClick={() => confirmDelete(location)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ));
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid">
      <div className="row border-bottom pb-3 mb-3">
        <div className="col col-md-6">
          <h1>Ubicaciones</h1>
        </div>
        <div className="col col-md-6 text-end">
          <button className="btn btn-dark" onClick={addLocation}>
            + Agregar
          </button>
        </div>
      </div>
      <HeaderRow headers={["Nombre", "Dirección", "Acciones"]} />
      {renderUbicaciones()}
    </div>
  );
};

export default AdminLocations;
