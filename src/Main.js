import React, { useEffect } from "react";
import { Router } from "@reach/router";
import Login from "./views/Login";
import Recuperar from "./views/Recuperar";
import Panel from "./views/Panel";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Modal from "./components/common/Modal";
import SuccessAlert from "./components/common/SuccessAlert";
import ErrorAlert from "./components/common/ErrorAlert";
import Loading from "./views/Loading";
import moment from "moment";

const Main = () => {
  const { user, userLoggedIn } = useContext(UserContext);

  useEffect(() => {
    userLoggedIn();
    moment.updateLocale("es", {
      weekdays: "Lun_Mar_Mie_Jue_Vie_Sab_Dom".split("_"),
    });
  }, []);

  return (
    <div className="container-fluid px-0">
      <Router>
        <Login path="/entrar" default />
        <Recuperar path="/recuperar" />
        {user !== null ? (
          <Panel path="/myadmin/*" />
        ) : (
          <Loading path="/myadmin/*" />
        )}
      </Router>
      <Modal />
      <SuccessAlert />
      <ErrorAlert />
    </div>
  );
};

export default Main;
