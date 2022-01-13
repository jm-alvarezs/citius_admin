import React, { useContext, useEffect } from "react";
import PaqueteCard from "../components/paquetes/PaquetesCard";
import { PackagesContext } from "../context/PackagesContext";
import { navigate } from "@reach/router";

const Paquetes = () => {
  const { paquetes, getPaquetes } = useContext(PackagesContext);

  useEffect(() => {
    getPaquetes();
  }, []);

  const renderPaquetes = () => {
    if (paquetes && paquetes !== null) {
      return paquetes.map((paquete) => (
        <PaqueteCard
          key={paquete.package_class_id}
          paquete={paquete}
          action={() => {
            navigate(`/checkout/${paquete.package_class_id}`);
          }}
        />
      ));
    }
    return <div className="spinner-border mx-2" role="status"></div>;
  };

  return (
    <div className="container-fluid">
      <h2 className="pb-3 mb-4 border-bottom">Paquetes</h2>
      <div className="row">{renderPaquetes()}</div>
    </div>
  );
};

export default Paquetes;
