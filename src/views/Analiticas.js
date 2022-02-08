import { Router } from "@reach/router";
import React from "react";
import AnaliticasIngresos from "./analiticas/AnaliticasIngresos";
import AnaliticasInscritos from "./analiticas/AnaliticasInscritos";
import AnaliticasInstructores from "./analiticas/AnaliticasInstructores";
import AnaliticasMensuales from "./analiticas/AnaliticasMensuales";
import AnaliticasPaquetes from "./analiticas/AnaliticasPaquetes";
import AnaliticasReservaciones from "./analiticas/AnaliticasReservaciones";

const Analitica = () => {
  return (
    <Router>
      <AnaliticasInscritos path="/inscritos" default />
      <AnaliticasPaquetes path="/paquetes" />
      <AnaliticasIngresos path="/ingresos" />
      <AnaliticasReservaciones path="/reservaciones" />
      <AnaliticasInstructores path="/instructores" />
      <AnaliticasMensuales path="/mensuales" />
    </Router>
  );
};

export default Analitica;
