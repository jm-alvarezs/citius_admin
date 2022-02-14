import { Link } from "@reach/router";
import React, { useContext, useEffect } from "react";
import PaqueteForm from "../../components/paquetes/PaqueteForm";
import { ClassTypeContext } from "../../context/ClassTypesContext";
import { LocationsContext } from "../../context/LocationsContext";
import { PackagesContext } from "../../context/PackageContext";

const AdminPaqueteForm = ({ package_class_id }) => {
  const {
    spinner,
    paquete,
    getPaqueteAdmin,
    setPropiedadPaquete,
    postPaquete,
    clearSinglePaquete,
    createPaquete,
  } = useContext(PackagesContext);

  const { class_types, getClassTypes } = useContext(ClassTypeContext);

  const { locations, getLocations } = useContext(LocationsContext);

  useEffect(() => {
    getClassTypes();
    getLocations();
    if (isNaN(package_class_id)) {
      createPaquete();
    } else {
      getPaqueteAdmin(package_class_id);
    }
    return clearSinglePaquete;
  }, []);

  return (
    <div className="container-fluid">
      <Link
        to="/myadmin/paquetes"
        className="btn btn-outline-secondary bold shadow-sm mb-3"
      >
        {"< "}Regresar a Paquetes
      </Link>
      <h1 className="mb-0">
        {isNaN(package_class_id) ? "Agregar" : "Editar"} Paquete
      </h1>
      <div className="card p-3 no-scale mt-3 shadow">
        {paquete && paquete !== null ? (
          <PaqueteForm
            paquete={paquete}
            modifier={setPropiedadPaquete}
            postPaquete={postPaquete}
            class_types={class_types}
            locations={locations}
            spinner={spinner}
          />
        ) : (
          <div className="spinner-border"></div>
        )}
      </div>
    </div>
  );
};

export default AdminPaqueteForm;
