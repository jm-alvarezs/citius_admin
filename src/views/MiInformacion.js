import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import moment from "moment";
import { BASE_URL } from "../utils";

const MiInformacion = () => {
  const [editMode, setEditMode] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [picture, setPicture] = useState(null);

  const { user, getUsuario, verifyEmail, updateUsuario, setPropiedadUser } =
    useContext(UserContext);

  useEffect(() => {
    if (user !== null) {
      if (user.file && user.file !== null && picture === null) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPicture(e.target.result);
        };
        reader.readAsDataURL(user.file);
      }
    }
  }, [user]);

  const handleSubmit = (e) => {
    setEditMode(false);
    e.preventDefault();
    updateUsuario(user);
  };

  const handleFiles = (e) => {
    const file = e.target.files[0];
    setPropiedadUser("file", file);
  };

  const renderImage = () => {
    const { idAdjunto } = user;
    if (idAdjunto && idAdjunto !== null) {
      return (
        <div className="col-4 col-md-4">
          <img
            src={`${BASE_URL}/adjuntos/${idAdjunto}`}
            className="video-form-thumbnail d-block my-3"
            alt="Perfil"
          />
        </div>
      );
    }
    if (picture !== null) {
      return (
        <div className="col-4 col-md-4">
          <img
            src={picture}
            className="video-form-thumbnail d-block my-3"
            alt="Perfil"
          />
        </div>
      );
    }
  };

  const renderImageForm = () => {
    if (changeImage || isNaN(user.idAdjunto) || user.idAdjunto === null) {
      return (
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFiles}
        />
      );
    }
    return (
      <>
        <button
          className="btn btn-outline-secondary d-block"
          onClick={() => setChangeImage(true)}
        >
          Cambiar Imagen
        </button>
        <button
          className="btn btn-outline-danger mt-5"
          onClick={() => setPropiedadUser("idAdjunto", null)}
        >
          Quitar Imagen
        </button>
      </>
    );
  };

  const renderInformacion = () => {
    const {
      idAdjunto,
      name,
      last_name,
      birthday,
      instagram,
      phone,
      email,
      handle_height,
      handle_travel,
      seat_height,
      seat_travel,
      emailVerified,
    } = user;

    const birthdate = moment(birthday).add(1, "day").format("YYYY-MM-DD");
    if (editMode) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="row">
            {renderImage()}
            <div className="col-8 col-md-8">
              <label>Foto</label>
              {renderImageForm()}
            </div>
          </div>
          <label>Nombre:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setPropiedadUser("name", e.target.value)}
          />
          <label>Apellidos:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={last_name}
            onChange={(e) => setPropiedadUser("last_name", e.target.value)}
          />
          <label>Instagram:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={instagram !== null ? instagram : ""}
            onChange={(e) => setPropiedadUser("instagram", e.target.value)}
          />
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            className="form-control mb-3"
            value={birthdate}
            onChange={(e) => setPropiedadUser("birthday", e.target.value)}
          />
          <label>Telefono Celular</label>
          <input
            type="tel"
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPropiedadUser("phone", e.target.value)}
          />
          <div className="row mt-2">
            <div className="col col-md-6">
              <button type="submit" className="btn btn-dark">
                Guardar
              </button>
            </div>
            <div className="col col-md-6 text-end">
              <button
                className="btn btn-link text-muted"
                onClick={() => {
                  setEditMode(false);
                  getUsuario();
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      );
    }
    return (
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col col-md-4">
            <img
              src={`${BASE_URL}/adjuntos/${idAdjunto}`}
              className="w-100 profile-image"
              alt="Perfil"
            />
          </div>
          <div className="col col-md-8">
            <h4 className="mb-3 pb-3 border-bottom">
              {name} {last_name}
            </h4>
            <div className="row">
              <div className="col-1">
                <i className="fa fa-birthday-cake"></i>
              </div>
              <div className="col-11">
                {moment(birthday).add(1, "day").format("DD MMM YYYY")}
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="col-11">
                {email} - (
                <span
                  className={
                    (emailVerified ? "text-success" : "text-danger") + " my-3"
                  }
                >
                  {!emailVerified ? (
                    <button
                      className="btn btn-link px-0 text-danger"
                      onClick={verifyEmail}
                    >
                      Verificar Correo
                    </button>
                  ) : (
                    "Verificado"
                  )}
                </span>
                )
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <i className="fa fa-phone"></i>
              </div>
              <div className="col-11">{phone}</div>
            </div>
            <div className="row">
              <div className="col-1">@</div>
              <div className="col-11">
                {instagram !== null ? instagram : ""}
              </div>
            </div>
            <button
              className="btn btn-outline-secondary mt-3"
              onClick={() => setEditMode(true)}
            >
              <i className="fa fa-edit"></i> Editar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <h1>Mi Información</h1>
      <div className="card p-3 shadow-sm no-scale">{renderInformacion()}</div>
    </div>
  );
};

export default MiInformacion;
