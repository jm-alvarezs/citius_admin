import React, { useContext, useEffect, useState } from "react";
import CoachCard from "../../components/coaches/CoachCard";
import CoachForm from "../../components/coaches/CoachForm";
import HeaderRow from "../../components/global/HeaderRow";
import PanelTitle from "../../components/global/PanelTitle";
import { CoachesContext } from "../../context/CoachesContext";
import { ModalContext } from "../../context/ModalContext";

const AdminCoaches = () => {
  const [query, setQuery] = useState("");

  const { coaches, getCoaches, deleteCoach, clearCoaches } =
    useContext(CoachesContext);
  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getCoaches();
    return clearCoaches;
  }, []);

  const addCoach = () => {
    modalComponent("Agregar Coach", <CoachForm idCoach="nueva" />);
  };

  const editCoach = (coach) => {
    modalComponent("Editar Coach", <CoachForm idCoach={coach.instructor_id} />);
  };

  const confirmDelete = (coach) => {
    modalComponent(
      "¡Precaución!",
      <div className="container-fluid px-0">
        <p>
          ¿Estás segura que quieres eliminar a la coach {coach.name}? Esta
          acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteCoach(coach.instructor_id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderCoaches = () => {
    if (coaches && coaches !== null) {
      let coachesRender = coaches;
      if (query !== "") {
        coachesRender = coachesRender.filter(
          (coach) =>
            coach.name.toLowerCase().includes(query) ||
            coach.last_name.toLowerCase().includes(query)
        );
      }
      if (coachesRender.length === 0) return <p>No hay coaches registrados.</p>;
      return coachesRender.map((coach) => (
        <CoachCard
          key={coach.instructor_id}
          coach={coach}
          editCoach={editCoach}
          deleteCoach={confirmDelete}
        />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid">
      <PanelTitle title="Coaches" onClick={addCoach} />
      <div className="container-fluid px-0 mb-3">
        <input
          type="text"
          value={query}
          className="form-control"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar paquete por nombre..."
        />
      </div>
      <HeaderRow headers={["Nombre", "Cumpleaños", "Acciones"]} />
      {renderCoaches()}
    </div>
  );
};

export default AdminCoaches;
