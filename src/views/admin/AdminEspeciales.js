import React, { useContext, useEffect } from "react";
import PaqueteRow from "../../components/paquetes/PaqueteRow";
import { ModalContext } from "../../context/ModalContext";
import { PackagesContext } from "../../context/PackageContext";

const AdminEspeciales = () => {
  const { paquetes, getPaquetesEspecialesAdmin, deletePaquete } =
    useContext(PackagesContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getPaquetesEspecialesAdmin();
  }, []);

  const confirmDelete = (paquete) => {
    modalComponent(
      "Precaución",
      <>
        <p>
          ¿Estás segura que deseas eliminar el paquete {paquete.title}? Esta
          acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deletePaquete(paquete.class_package_id)}
        >
          Eliminar
        </button>
      </>
    );
  };

  const renderPaquetesEspeciales = () => {
    if (paquetes && paquetes !== null) {
      return paquetes.map((paquete) => (
        <PaqueteRow
          key={paquete.class_package_id}
          paquete={paquete}
          confirmDelete={confirmDelete}
        />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid">
      <h1 className="border-bottom pb-3 mb-3">Paquetes Especiales</h1>
      <div className="row bg-light border py-2 mx-0 bold">
        <div className="col col-md-3">Título</div>
        <div className="col col-md-3">Descripción Corta</div>
        <div className="col col-md-3">Precio</div>
        <div className="col col-md-3">Acciones</div>
      </div>
      {renderPaquetesEspeciales()}
    </div>
  );
};

export default AdminEspeciales;
