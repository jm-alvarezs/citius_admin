import React, { useContext, useEffect } from "react";
import { ClassCategoryContext } from "../../context/ClassCategoryContext";
import { Link } from "@reach/router";

const AdminCategories = () => {
  const { class_categories, getClassCategories } =
    useContext(ClassCategoryContext);

  useEffect(() => {
    getClassCategories();
  }, []);

  const renderCategorias = () => {
    if (class_categories && class_categories !== null) {
      if (class_categories.length === 0) {
        return <p>No hay categorías disponibles.</p>;
      }
      return class_categories.map((category) => (
        <div
          key={category.class_category_id}
          className="card p-3 no-scale shadow-sm my-2"
        >
          <div className="row align-items-center">
            <div className="col-12 col-md-3">{category.name}</div>
            <div className="col-12 col-md-3">{category.description}</div>
            <div className="col-12 col-md-3">
              {"/"}
              {category.handle}
            </div>
            <div className="col-12 col-md-3">
              <Link
                to={`./${category.class_category_id}`}
                className="btn btn-outline-dark"
              >
                <i className="fa fa-edit me-2"></i> Editar
              </Link>
            </div>
          </div>
        </div>
      ));
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3 align-items-center">
        <div className="col-12 col-md-6">
          <h1>Categorías</h1>
        </div>
        <div className="col-12 col-md-6 text-end">
          <Link to="./nueva" className="btn btn-dark">
            + Agregar
          </Link>
        </div>
      </div>
      <div className="row mx-0 bold py-2 bg-light border mb-3 align-items-center">
        <div className="col-3">Nombre</div>
        <div className="col-3">Descripción</div>
        <div className="col-3">Handle</div>
        <div className="col-3">Acciones</div>
      </div>
      {renderCategorias()}
    </div>
  );
};

export default AdminCategories;
