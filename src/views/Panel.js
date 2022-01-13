import React, { useContext } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../context/UserContext";
import MobileMenu from "../components/common/MobileMenu";
import Admin from "./Admin";
import Analitica from "./Analiticas";
import PanelNavbar from "../components/global/PanelNavbar";
import Footer from "../components/global/Footer";

const Panel = () => {
  const { user, signOut } = useContext(UserContext);

  return (
    <div className="container-fluid px-0">
      <MobileMenu signOut={signOut} user={user} />
      <div className="sidebar">
        <PanelNavbar user={user} signOut={signOut} />
      </div>
      <div className="main-panel px-4">
        <div className="content overflow-x-hidden">
          <Router>
            <Admin path="/*" default />
            <Analitica path="/analytics/*" />
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Panel;
