import React, { useContext, useEffect } from "react";
import { PackagesContext } from "../../context/PackageContext";
import AsistenteRow from "../../components/customers/AsistenteRow";

const AdminAsistentesEspeciales = ({ package_id }) => {
  const { paquete, asistentes, getAsistentesEspecial } =
    useContext(PackagesContext);

  useEffect(() => {
    getAsistentesEspecial(package_id);
  }, []);

  const renderAsistentes = () => {
    if (asistentes && asistentes !== null) {
      if (asistentes.length === 0) {
        return <p>Aún no hay asistentes registrados</p>;
      }
      return asistentes.map((asistente) => (
        <AsistenteRow
          key={asistente.class_reservation_id}
          asistente={asistente}
          is_special_event
        />
      ));
    }
  };

  const renderClase = () => {
    if (paquete && paquete !== null) {
      return (
        <div className="container-fluid px-0">
          <p>{paquete.title}</p>
          <p>{paquete.description}</p>
        </div>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="contiainer-fluid">
      <div className="row pb-3 mb-3 border-bottom mx-0">
        <div className="col col-md-6">
          <h1>Paquete Especial</h1>
        </div>
        <div className="col col-md-6 text-end"></div>
      </div>
      <div className="card p-3 no-scale">{renderClase()}</div>
      <div className="row bold bg-light border py-2 mt-4 mb-2 mx-0">
        <div className="col col-md-4">Nombre</div>
        <div className="col col-md-4">Teléfono</div>
        <div className="col col-md-4">Acciones</div>
      </div>
      {renderAsistentes()}
    </div>
  );
};

export default AdminAsistentesEspeciales;
