import React, { useContext, useEffect } from "react";
import PaqueteCard from "../components/paquetes/PaquetesCard";
import { PackagesContext } from "../context/PackageContext";
import { navigate } from "@reach/router";

const Shop = () => {
  const { paquetes, getPaquetes } = useContext(PackagesContext);

  useEffect(() => {
    getPaquetes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPresenciales = () => {
    if (paquetes && paquetes !== null) {
      let paquetesRender = paquetes.filter(
        (paquete) =>
          !paquete.include_online_membership && !paquete.is_special_event
      );
      if (paquetesRender.length === 0) {
        return <p>No hay paquetes disponibles.</p>;
      }
      return paquetesRender.map((paquete) => (
        <PaqueteCard
          key={paquete.class_package_id}
          paquete={paquete}
          action={() => {
            navigate(`/checkout/${paquete.class_package_id}`);
          }}
        />
      ));
    }
    return <div className="spinner-border mx-2" role="status"></div>;
  };

  const renderEspeciales = () => {
    if (paquetes && paquetes !== null) {
      const especiales = paquetes.filter((paquete) => paquete.is_special_event);
      if (especiales.length === 0) {
        return <p className="px-3">No hay paquetes disponibles.</p>;
      }
      return especiales.map((especial) => (
        <PaqueteCard
          key={especial.package_id}
          paquete={especial}
          action={() => {
            navigate(`/checkout/${especial.package_id}`);
          }}
        />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid">
      <h2 className="pb-3 border-bottom">Paquetes</h2>
      <div className="row">{renderPresenciales()}</div>
      <h2 className="pb-3 border-bottom mt-4">Eventos Especiales</h2>
      <div className="row">{renderEspeciales()}</div>
    </div>
  );
};

export default Shop;
