import { Link, navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import logo from "../assets/images/logo_blanco.png";

const Loading = () => {
  const [prev, setPrev] = useState(false);
  const { spinner, signOut } = useContext(UserContext);

  useEffect(() => {
    setPrev(spinner);
  }, []);

  useEffect(() => {
    if (!spinner && prev) {
      navigate("/entrar");
    }
  }, [spinner]);

  return (
    <div className="container-fluid vh-100">
      <div id="loading"></div>
      <div className="row align-items-center pb-5 vh-100 text-white btn-container">
        <div className="container-fluid loading-text text-center">
          <img src={logo} className="loading-logo mb-5" />
          <h4 className="text-white">Accediendo</h4>
          <div className="spinner-border text-white mb-3"></div>
          <p className="mb-0 text-white">
            Si la página no carga en más de 30 segundos
          </p>
          <Link to="/entrar" className="text-white" onClick={signOut}>
            Haz click aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loading;
