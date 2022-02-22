import React, { useContext } from "react";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import SingleClassCard from "../../components/clases/SingleClassCard";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import HeaderRow from "../../components/global/HeaderRow";
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
      <HeaderRow
        headers={["Fecha", "Coach", "Ubicación", "Capacidad", "Reservadas"]}
      />
      {renderClases()}
    </div>
  );
};

export default AdminSesiones;
