import React, { useContext } from "react";
import moment from "moment";
import { ModalContext } from "../../context/ModalContext";
import ClaseForm from "./ClaseForm";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";
import { UserContext } from "../../context/UserContext";
import { Link } from "@reach/router";

const ScheduleClass = ({ singleClass }) => {
  const { modalComponent } = useContext(ModalContext);
  const { setPropiedadClase, eliminarClase } = useContext(
    ClassInstructorContext
  );

  const { user } = useContext(UserContext);

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

  const isFull = () => {
    if (
      singleClass !== null &&
      Array.isArray(singleClass.class_reservations) !== null
    ) {
      return singleClass.capacity - singleClass.class_reservations.length <= 0;
    }
  };

  const renderButtons = () => {
    if (user.role !== "coach") {
      return (
        <div>
          <button
            className="btn btn-dark btn-sm my-1 mx-1"
            onClick={handleEdit}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            className="btn btn-danger btn-sm my-1 mx-2"
            onClick={handleDelete}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      );
    }
  };

  const renderInstructors = () => {
    if (singleClass.class_instructors.length === 1) {
      const instructor = singleClass.class_instructors[0].instructor;
      if (instructor !== null) {
        return instructor.nick_name !== null
          ? instructor.nick_name
          : instructor.name;
      }
    } else {
      return singleClass.class_instructors.map(({ instructor }) => (
        <span className="d-block">
          {instructor.nick_name !== null
            ? instructor.nick_name
            : instructor.name}
        </span>
      ));
    }
  };

  return (
    <div
      className={`schedule-class my-2 ${
        singleClass.class_package_id !== null
          ? "bg-dark text-accent"
          : "text-white"
      } ${isFull() ? "bg-secondary" : ""}`}
      style={{ backgroundColor: singleClass.class_type.color }}
    >
      <p className="mb-1 bold">
        <i className={singleClass.icon} /> {singleClass.class_type.name}
      </p>
      <p className="mb-1 small">{singleClass.description}</p>
      <p className="font-weight-bold mb-0">
        <i className="far fa-clock"></i>{" "}
        {moment(singleClass.class_date).utc().format("HH:mm")}
      </p>
      <p className="mb-1">{renderInstructors()}</p>
      <Link
        to={`/myadmin/asistentes/${singleClass.single_class_id}`}
        className="btn btn-link text-white px-0 py-0 btn-sm mb-1"
      >
        <i className="fa fa-user"></i> {singleClass.reservations} /{" "}
        {singleClass.capacity}
      </Link>
      {renderButtons()}
    </div>
  );
};

export default ScheduleClass;
