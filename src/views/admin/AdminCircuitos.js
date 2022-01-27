import React, { useContext, useEffect } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import PanelTitle from "../../components/global/PanelTitle";
import { CircuitContext } from "../../context/CircuitContext";

const AdminCircuitos = () => {
  const { circuits, getCircuits } = useContext(CircuitContext);

  useEffect(() => {
    getCircuits();
  }, []);

  const renderCircuitos = () => {
    if (Array.isArray(circuits)) {
      return circuits.map((circuit) => (
        <div className="row p-2">
          <div className="col">{circuit.circuit_id}</div>
          <div className="col">{circuit.name}</div>
          <div className="col">{circuit.description}</div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid">
      <PanelTitle title="Circuitos" />
      <div className="card p-2 no-scale shadow-sm">
        <HeaderRow headers={["# Circuito", "Nombre", "Descripcion"]} />
        {renderCircuitos()}
      </div>
    </div>
  );
};

export default AdminCircuitos;
