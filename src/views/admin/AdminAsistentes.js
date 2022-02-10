import React, { useContext, useEffect, useState } from "react";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import AgregarAsistente from "../../components/clases/AgregarAsistente";
import AsistenteRow from "../../components/customers/AsistenteRow";
import PanelTitle from "../../components/global/PanelTitle";
import ClaseForm from "../../components/clases/ClaseForm";
import HeaderRow from "../../components/global/HeaderRow";
import moment from "moment";
import { ReservationsContext } from "../../context/ReservationsContext";
import MapaLugares from "../../components/clases/MapaLugares";

const AdminAsistentes = ({ single_class_id }) => {
  const {
    clase,
    clearClase,
    getAsistentes,
    postPayment,
    eliminarClase,
    updateGuestName,
  } = useContext(ClassInstructorContext);

  const { postAttend } = useContext(ReservationsContext);

  const { eliminarReservacion } = useContext(ReservationsContext);

  const { user } = useContext(UserContext);

  const { modalComponent } = useContext(ModalContext);

  const [editName, setEditName] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getAsistentes(single_class_id);
    return () => {
      clearClase();
    };
  }, []);

  const addAsistente = () => {
    modalComponent(
      "Agregar Asistente",
      <AgregarAsistente single_class_id={single_class_id} />
    );
  };

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
    if (clase && clase !== null) {
      if (clase.asistentes && clase.asistentes !== null) {
        if (clase.asistentes.length === 0) {
          return <p className="mt-2 px-1">Aún no hay asistentes registrados</p>;
        }
        return clase.asistentes.map((asistente) => (
          <AsistenteRow
            key={asistente.class_reservation_id}
            name={name}
            user={user}
            asistente={asistente}
            editName={editName}
            setName={setName}
            setEditName={setEditName}
            confirmCancel={confirmCancel}
            postPayment={postPayment}
            postAttend={postAttend}
            updateGuestName={updateGuestName}
            single_class_id={single_class_id}
          />
        ));
      }
    }
  };

  const confirmCancel = (customer) => {
    modalComponent(
      "¿Cancelar reservacion?",
      <div className="container-fluid">
        <p>
          ¿Estás segura que deseas cancelar la reservacion de {customer.name}?
          Esta acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() =>
            eliminarReservacion(customer.class_reservation_id, () =>
              getAsistentes(single_class_id)
            )
          }
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderClase = () => {
    if (clase && clase !== null) {
      return (
        <div className="row">
          <div className="col col-md-6">
            <h4>Datos de Clase</h4>
            <p>{moment(clase.class_date).utc().format("DD MMM YYYY HH:mm")}</p>
            <p>{clase.class_type.name}</p>
            <p>{clase.location.name}</p>
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
            {clase.class_type.spot_map !== null && (
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
      <PanelTitle title="Clase Presencial" onClick={addAsistente} />
      <div className="card p-3 shadow-sm no-scale">{renderClase()}</div>
      <HeaderRow
        headers={["Nombre", "Instagram", "Teléfono", "Lugar", "Acciones"]}
      />
      {renderAsistentes()}
    </div>
  );
};

export default AdminAsistentes;
