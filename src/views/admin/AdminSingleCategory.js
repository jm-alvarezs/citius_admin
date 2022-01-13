import React, { useContext, useEffect, useState } from "react";
import { ClassCategoryContext } from "../../context/ClassCategoryContext";
import { BASE_URL } from "../../utils";
import { Link } from "@reach/router";
import { ModalContext } from "../../context/ModalContext";
import Switch from "react-switch";

const AdminSingleCategory = ({ class_category_id }) => {
  const [changeImage, setChangeImage] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    class_category,
    getClassCategory,
    createClassCategory,
    postClassCategory,
    setPropiedadCategory,
    deleteClassCategory,
  } = useContext(ClassCategoryContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    if (isNaN(class_category_id)) {
      createClassCategory();
    } else {
      getClassCategory(class_category_id);
    }
  }, [class_category_id]);

  useEffect(() => {
    if (class_category !== null) {
      if (
        class_category.file &&
        class_category.file !== null &&
        picture === null
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPicture(e.target.result);
        };
        reader.readAsDataURL(class_category.file);
      }
    }
  }, [class_category]);

  const handleFiles = (e) => {
    const file = e.target.files[0];
    setPropiedadCategory("file", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postClassCategory(class_category);
  };

  const confirmDelete = () => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás segura que deseas eliminar la categoría {class_category.name}?
          Esta acción NO puede deshacerse y podría traer consecuencias con la
          fecha de vigencia de las alumnas.
        </p>
        <p>
          <b>Usar sólo en emergencia: </b> solucionar la consecuencia podría
          generar semanas de trabajo y cargo extra de desarrollo.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteClassCategory(class_category_id)}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    );
  };

  const renderImage = () => {
    const { idAdjunto } = class_category;
    if (idAdjunto && idAdjunto !== null) {
      if (isNaN(idAdjunto))
        return <img src={idAdjunto} className="video-form-thumbnail d-block" />;
      return (
        <img
          src={`${BASE_URL}/adjuntos/${idAdjunto}`}
          className="video-form-thumbnail d-block"
        />
      );
    }
    if (picture !== null) {
      return <img src={picture} className="video-form-thumbnail d-block" />;
    }
  };

  const renderImageForm = () => {
    if (changeImage || isNaN(class_category.class_category_id)) {
      return (
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFiles}
        />
      );
    }
    return (
      <button
        className="btn btn-outline-secondary d-block"
        onClick={() => setChangeImage(true)}
      >
        Cambiar Imagen
      </button>
    );
  };

  const renderForm = () => {
    if (class_category && class_category !== null) {
      const { available, name, description, handle, is_free } = class_category;
      return (
        <form className="card no-scale p-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6">¿Disponible?</div>
            <div className="col-12 col-md-6">
              <Switch
                checked={available}
                onChange={(checked) =>
                  setPropiedadCategory("available", checked)
                }
              />
            </div>
          </div>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setPropiedadCategory("name", e.target.value)}
          />
          <label>Descripción</label>
          <input
            type="text"
            className="form-control mb-3"
            value={description}
            onChange={(e) =>
              setPropiedadCategory("description", e.target.value)
            }
          />
          <label>Handle</label>
          <input
            type="text"
            className="form-control mb-3"
            value={handle}
            onChange={(e) => setPropiedadCategory("handle", e.target.value)}
          />
          <div className="row my-3">
            <div className="col-4 col-md-4"> {renderImage()}</div>
            <div className="col-8 col-md-8">
              <label>Thumbnail</label>
              {renderImageForm()}
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6 bold">¿Es gratis?</div>
            <div className="col-md-6">
              <Switch
                checked={is_free}
                onChange={(checked) => setPropiedadCategory("is_free", checked)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-md-6">
              <button type="submit" className="btn btn-dark">
                Guardar
              </button>
            </div>
            <div className="col-12 col-md-6">
              <Link to="../" className="text-secondary">
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row border-bottom pb-3 mb-3">
        <div className="container-fluid">
          <h1 className="h3">
            {isNaN(class_category_id) ? "Agregar" : "Editar"} Categoría
          </h1>
        </div>
      </div>
      {renderForm()}
      <div className="mt-5">
        <h5 className="border-bottom pb-2 mb-3">Precaución</h5>
        <button className="btn btn-danger" onClick={confirmDelete}>
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  );
};

export default AdminSingleCategory;
