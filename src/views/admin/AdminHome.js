import React, { useEffect, useContext } from "react";
import { HomeContext } from "../../context/HomeContext";
import PaqueteCard from "../../components/paquetes/PaquetesCard";
import { ModalContext } from "../../context/ModalContext";
import { PackagesContext } from "../../context/PackageContext";

const AdminHome = () => {
  const {
    online,
    presenciales,
    getOnline,
    getPresenciales,
    addToHome,
    deleteFromHome,
  } = useContext(HomeContext);

  const { paquetes, getPaquetes } = useContext(PackagesContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getPaquetes();
    getOnline();
    getPresenciales();
  }, []);

  const addPresenciales = () => {
    modalComponent(
      "Agregar Paquete Presencial",
      <div>
        {paquetes
          .filter(
            (paquete) =>
              !presenciales.find(
                (presencial) =>
                  presencial.package_class_id === paquete.package_class_id
              )
          )
          .map((presencial) => (
            <div className="row my-3 align-items-center">
              <div className="col-12 col-md-6">{presencial.title}</div>
              <div className="col-12 col-md-6">
                <button
                  className="btn btn-outline-dark"
                  onClick={() =>
                    addToHome(presencial.package_class_id, "presencial")
                  }
                >
                  + Agregar
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const addOnline = () => {
    modalComponent(
      "Agregar Paquete Online",
      <div>
        {paquetes
          .filter(
            (paquete) =>
              !online.find(
                (online) => online.package_class_id === paquete.package_class_id
              )
          )
          .map((online) => (
            <div className="row my-3 align-items-center">
              <div className="col-12 col-md-6">{online.title}</div>
              <div className="col-12 col-md-6">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => addToHome(online.package_class_id, "online")}
                >
                  + Agregar
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const confirmRemove = (paquete, type) => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás segura que deseas eliminar del home el paquete {paquete.title}?
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteFromHome(paquete.package_class_id, type)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderPresenciales = () => {
    if (presenciales && presenciales !== null) {
      return presenciales.map((presencial) => (
        <PaqueteCard
          key={presencial.package_class_id}
          paquete={presencial}
          action={() => confirmRemove(presencial, "presencial")}
          buttonTitle="Eliminar"
          className="btn btn-outline-danger"
        />
      ));
    }
  };

  const renderOnline = () => {
    if (online && online !== null) {
      return online.map((online) => (
        <PaqueteCard
          key={online.package_class_id}
          paquete={online}
          action={() => confirmRemove(online, "online")}
          buttonTitle="Eliminar"
          className="btn btn-outline-danger"
        />
      ));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row border-bottom pb-3 mb-3 align-items-center">
        <div className="col-12 col-md-6">
          <h3>Paquetes Online</h3>
        </div>
        <div className="col-12 col-md-6 text-end">
          <button className="btn btn-dark" onClick={addOnline}>
            + Agregar
          </button>
        </div>
      </div>
      <div className="row">{renderOnline()}</div>
      <div className="row mt-5 border-bottom pb-3 mb-3 align-items-center">
        <div className="col-12 col-md-6">
          <h3>Paquetes Presenciales</h3>
        </div>
        <div className="col-12 col-md-6 text-end">
          <button className="btn btn-dark" onClick={addPresenciales}>
            + Agregar
          </button>
        </div>
      </div>
      <div className="row">{renderPresenciales()}</div>
    </div>
  );
};

export default AdminHome;
