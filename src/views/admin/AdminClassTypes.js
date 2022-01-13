import React, { useContext, useEffect } from "react";
import { ClassTypeContext } from "../../context/ClassTypesContext";
import { ModalContext } from "../../context/ModalContext";
import AdminClassTypeForm from "./AdminClassTypeForm";
import ClassTypeRow from "../../components/classTypes/ClassTypeRow";

const AdminClassTypes = () => {
  const { class_types, getClassTypes, deleteClassType } =
    useContext(ClassTypeContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getClassTypes();
  }, []);

  const createType = () => {
    modalComponent(
      "Agregar Clase",
      <AdminClassTypeForm class_type_id="nuevo" />
    );
  };

  const editClassType = (class_type_id) => {
    modalComponent(
      "Editar Clase",
      <AdminClassTypeForm class_type_id={class_type_id} />
    );
  };

  const confirmDelete = (class_type) => {
    modalComponent(
      "Eliminar Clase",
      <div>
        <p>
          ¿Estás seguro que deseas eliminar el tipo de clase "{class_type.name}
          "? Esta acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteClassType(class_type.class_type_id)}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    );
  };

  const renderTipos = () => {
    if (class_types && class_types !== null) {
      if (class_types.length === 0) {
        return <p>No hay tipos de clase disponibles.</p>;
      }
      return class_types.map((category) => (
        <ClassTypeRow
          key={category.class_type_id}
          category={category}
          editClassType={editClassType}
          confirmDelete={confirmDelete}
        />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3 align-items-center">
        <div className="col-12 col-md-6">
          <h1>Tipos de Clase</h1>
        </div>
        <div className="col-12 col-md-6 text-end">
          <button className="btn btn-accent" onClick={createType}>
            + Agregar
          </button>
        </div>
      </div>
      <div className="row bold mx-0 py-2 bg-light border align-items-center">
        <div className="col-12 col-md-3">Nombre</div>
        <div className="col-12 col-md-2">Icono</div>
        <div className="col-12 col-md-2">Color</div>
        <div className="col-12 col-md-2">Mapa</div>
        <div className="col-12 col-md-3">Acciones</div>
      </div>
      {renderTipos()}
    </div>
  );
};

export default AdminClassTypes;
