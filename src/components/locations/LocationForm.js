import React, { useContext } from "react";
import { LocationsContext } from "../../context/LocationsContext";

const LocationForm = ({ modifier, postLocation }) => {
  const { location } = useContext(LocationsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postLocation(location);
  };

  const renderForm = () => {
    if (location && location !== null) {
      const { name, description, address } = location;
      return (
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) => modifier("name", e.target.value)}
          />
          <label>Descripción</label>
          <input
            type="text"
            className="form-control mb-3"
            value={description}
            onChange={(e) => modifier("description", e.target.value)}
          />
          <label>Dirección</label>
          <input
            type="text"
            className="form-control mb-3"
            value={address}
            onChange={(e) => modifier("address", e.target.value)}
          />
          <input type="submit" className="btn btn-accent" value="Guardar" />
        </form>
      );
    }
  };

  return <div className="container-fluid px-0">{renderForm()}</div>;
};

export default LocationForm;
