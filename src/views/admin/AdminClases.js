import React, { useContext, useEffect } from "react";
import Schedule from "../../components/clases/Schedule";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import { LocationsContext } from "../../context/LocationsContext";
import ClaseForm from "../../components/clases/ClaseForm";
import { ModalContext } from "../../context/ModalContext";
import PanelTitle from "../../components/global/PanelTitle";

const AdminClases = () => {
  const { days, getSchedule, setPropiedadClase } = useContext(
    ClassInstructorContext
  );

  const { locations, getLocations } = useContext(LocationsContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getSchedule();
    getLocations();
  }, []);

  const addClase = () => {
    modalComponent(
      "Agregar Clase",
      <ClaseForm class_instructor_id="nueva" modifier={setPropiedadClase} />
    );
  };

  return (
    <div className="container-fluid">
      <PanelTitle title="Clases" onClick={addClase} />
      <Schedule days={days} locations={locations} />
    </div>
  );
};

export default AdminClases;
