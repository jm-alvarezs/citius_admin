import React, { useContext, useEffect } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import PanelTitle from "../../components/global/PanelTitle";
import PaqueteEspecialRow from "../../components/paquetes/PaqueteEspecialRow";
import { ModalContext } from "../../context/ModalContext";
import { PackagesContext } from "../../context/PackageContext";

const AdminEspeciales = () => {
  const { paquetes, getPaquetesEspecialesAdmin, deletePaquete, clearPaquetes } =
    useContext(PackagesContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getPaquetesEspecialesAdmin();
    return clearPaquetes;
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
      if (paquetes.length === 0) {
        return <p className="p-2">No hay paquetes especiales registrados.</p>;
      }
      return paquetes.map((paquete) => (
        <PaqueteEspecialRow
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
      <PanelTitle title="Paquetes Especiales" />
      <HeaderRow headers={["Título", "Fecha y Hora", "Capacidad", "Compras"]} />
      {renderPaquetesEspeciales()}
    </div>
  );
};

export default AdminEspeciales;
