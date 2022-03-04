import React, { useContext } from "react";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import SingleClassCard from "../../components/clases/SingleClassCard";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import moment from "moment";

const AdminSesiones = () => {
  const { spinner, clases, getClases } = useContext(ClassInstructorContext);

  const renderClases = () => {
    if (clases && clases !== null && !spinner) {
      if (clases.length === 0) {
        return <p className="mt-3">No hay clases disponibles.</p>;
      }
      return clases.map((clase) => (
        <SingleClassCard key={clase.single_class_id} clase={clase} />
      ));
    }
    return <div className="spinner-border mt-3"></div>;
  };

  return (
    <div className="container-fluid">
      <PanelTitleDate
        title="Asistentes"
        callback={getClases}
        initialDate={moment().format("YYYY-MM-DD")}
      />
      <div className="row border bg-light py-1 mx-0 bold mt-3">
        <div className="col">Fecha</div>
        <div className="col">Coach</div>
        <div className="col">Ubicación</div>
        <div className="col hide-mobile">Capacidad</div>
        <div className="col hide-mobile">Reservadas</div>
        <div className="col show-mobile">Reservadas</div>
      </div>
      {renderClases()}
    </div>
  );
};

export default AdminSesiones;
