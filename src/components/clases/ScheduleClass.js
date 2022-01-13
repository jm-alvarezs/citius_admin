import React, { useContext } from "react";
import moment from "moment";
import { ModalContext } from "../../context/ModalContext";
import ClaseForm from "./ClaseForm";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";

const ScheduleClass = ({ singleClass }) => {
  const { modalComponent } = useContext(ModalContext);
  const { setPropiedadClase, eliminarClase } = useContext(
    ClassInstructorContext
  );

  const handleEdit = () => {
    modalComponent(
      "Agregar Clase",
      <ClaseForm
        single_class_id={singleClass.single_class_id}
        modifier={setPropiedadClase}
      />
    );
  };

  const handleDelete = () => {
    modalComponent(
      "Eliminar Clase",
      <div>
        <p>
          ¿Estás segura que deseas eliminar la clase de{" "}
          {singleClass.class_type.name} del{" "}
          {moment(singleClass.class_date).format("DD MMM YYY")}?
        </p>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => eliminarClase(singleClass.single_class_id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div>
        <button className="btn btn-dark btn-sm mx-2" onClick={handleEdit}>
          Editar
        </button>
        <button className="btn btn-danger btn-sm mx-2" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    );
  };

  const renderInstructors = () => {
    if (singleClass.class_instructors.length === 1) {
      return singleClass.class_instructors[0].instructor.name;
    }
    return singleClass.class_instructors.map((class_instructor) => (
      <span className="d-block">{class_instructor.instructor.name}</span>
    ));
  };

  return (
    <div className="schedule-class p-3 my-2 bg-accent text-dark">
      <p className="mb-1 bold">
        <i className={singleClass.icon} /> {singleClass.class_type.name}
      </p>
      <p className="mb-1 small">{singleClass.description}</p>
      <p className="font-weight-bold mb-1">
        <i className="far fa-clock"></i>{" "}
        {moment(singleClass.class_date).utc().format("HH:mm")}
      </p>
      {renderInstructors()}
      {renderButtons()}
    </div>
  );
};

export default ScheduleClass;