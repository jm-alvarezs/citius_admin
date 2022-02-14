import React, { useContext, useEffect } from "react";
import { PackagesContext } from "../../context/PackageContext";
import AsistenteRow from "../../components/customers/AsistenteRow";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import MapaLugares from "../../components/clases/MapaLugares";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import ClaseForm from "../../components/clases/ClaseForm";
import PanelTitle from "../../components/global/PanelTitle";
import HeaderRow from "../../components/global/HeaderRow";

const AdminAsistentesEspeciales = ({ class_package_id }) => {
  const { paquete, asistentes, getAsistentesEspecial } =
    useContext(PackagesContext);

  const { modalComponent } = useContext(ModalContext);

  const { user } = useContext(UserContext);

  const { clase, clearClase, eliminarClase } = useContext(
    ClassInstructorContext
  );

  useEffect(() => {
    getAsistentesEspecial(class_package_id);
    return clearClase;
  }, [class_package_id]);

  const handleEdit = () => {
    modalComponent("Editar Clase", <ClaseForm />);
  };

  const confirmDeleteClass = (clase) => {
    modalComponent(
      "Eliminar Clase",
      <div className="container-fluid px-0">
        <p>
          ¿Estás segura que deseas eliminar la clase {clase.description}? Esta
          acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => eliminarClase(clase.class_id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderAsistentes = () => {
    if (paquete && paquete !== null) {
      const asistentes = paquete.single_class.class_reservations;
      if (Array.isArray(asistentes)) {
        if (asistentes.length === 0) {
          return <p className="p-2">Aún no hay asistentes registrados</p>;
        }
        return asistentes.map((asistente) => (
          <AsistenteRow
            key={asistente.class_reservation_id}
            asistente={asistente}
            is_special_event
          />
        ));
      }
    }
  };

  const renderClase = () => {
    if (paquete && paquete !== null) {
      return (
        <div className="row">
          <div className="col col-md-6">
            <h4>Datos de Clase</h4>
            <p>{paquete.title}</p>
            <p>
              {moment(paquete.single_class.class_date)
                .utc()
                .format("DD MMM YYYY HH:mm")}
            </p>
            <p>{paquete.single_class.class_type.name}</p>
            <p>{paquete.single_class.location.name}</p>
            {["admin", "manager"].includes(user.role) && (
              <div>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleEdit}
                >
                  <i className="fa fa-edit me-2"></i> Editar
                </button>
                <button
                  className="btn btn-outline-danger mx-3"
                  onClick={confirmDeleteClass}
                >
                  <i className="fa fa-trash"></i> Eliminar
                </button>
              </div>
            )}
          </div>
          <div className="col col-md-6">
            {paquete.single_class.class_type.spot_map !== null && (
              <MapaLugares
                rows={clase.class_type.spot_map
                  .split(",")
                  .map((number) => parseInt(number))}
                taken_spots={clase.asistentes.map(({ spot }) => spot)}
              />
            )}
          </div>
        </div>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="contiainer-fluid">
      <PanelTitle title="Evento Especial" hideButton />
      <div className="card p-3 shadow-sm border no-scale">{renderClase()}</div>
      <HeaderRow
        headers={["Nombre", "Instagram", "Teléfono", "Lugar", "Acciones"]}
      />
      {renderAsistentes()}
    </div>
  );
};

export default AdminAsistentesEspeciales;
