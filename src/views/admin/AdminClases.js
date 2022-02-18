import React, { useContext } from "react";
import Schedule from "../../components/clases/Schedule";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import ClaseForm from "../../components/clases/ClaseForm";
import { ModalContext } from "../../context/ModalContext";
import PanelTitle from "../../components/global/PanelTitle";
import { UserContext } from "../../context/UserContext";
import ScheduleMobile from "../../components/clases/ScheduleMobile";

const AdminClases = () => {
  const { setPropiedadClase } = useContext(ClassInstructorContext);

  const { modalComponent } = useContext(ModalContext);

  const { user } = useContext(UserContext);

  const addClase = () => {
    modalComponent(
      "Agregar Clase",
      <ClaseForm class_instructor_id="nueva" modifier={setPropiedadClase} />
    );
  };

  return (
    <div className="container-fluid">
      <PanelTitle
        title="Clases"
        onClick={addClase}
        hideButton={user.role === "coach"}
      />
      <Schedule />
      <ScheduleMobile />
    </div>
  );
};

export default AdminClases;
