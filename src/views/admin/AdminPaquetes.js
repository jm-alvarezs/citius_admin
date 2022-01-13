import { Link } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import PaqueteRow from "../../components/paquetes/PaqueteRow";
import { ModalContext } from "../../context/ModalContext";
import { PackagesContext } from "../../context/PackageContext";

const AdminPaquetes = () => {
  const [query, setQuery] = useState("");
  const { paquetes, getAllPaquetes, deletePaquete } =
    useContext(PackagesContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getAllPaquetes();
  }, []);

  const renderPaquetes = () => {
    if (paquetes && paquetes !== null) {
      let paquetesRender = paquetes;
      if (query !== "") {
        paquetesRender = paquetesRender.filter((paquete) =>
          paquete.title.toLowerCase().includes(query)
        );
      }
      if (paquetesRender.length === 0) {
        return <p>No hay paquetes disponibles.</p>;
      }
      return paquetesRender.map((paquete) => (
        <PaqueteRow
          key={paquete.class_package_id}
          paquete={paquete}
          confirmDelete={confirmDelete}
        />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  const confirmDelete = (paquete) => {
    modalComponent(
      "Precaución",
      <>
        <p>
          ¿Estás segura que deseas eliminar el paquete {paquete.title}? Esta
          acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deletePaquete(paquete.class_package_id)}
        >
          Eliminar
        </button>
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center mb-3">
        <div className="col col-md-6">
          <h1>Paquetes</h1>
        </div>
        <div className="col col-md-6 text-end">
          <Link className="btn btn-accent" to="./nuevo">
            + Agregar
          </Link>
        </div>
      </div>
      <div className="container-fluid px-0 mb-3">
        <input
          type="text"
          value={query}
          className="form-control"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar paquete por nombre..."
        />
      </div>
      <div className="row bg-light border py-2 mx-0 bold">
        <div className="col col-md-3">Título</div>
        <div className="col col-md-2">Disponible</div>
        <div className="col col-md-2">Precio</div>
        <div className="col col-md-2">Oferta</div>
        <div className="col col-md-3">Acciones</div>
      </div>
      {renderPaquetes()}
    </div>
  );
};

export default AdminPaquetes;
