import React, { useState } from "react";
import { Link } from "@reach/router";
import MobileMenuItem from "./MobileMenuItem";
import { menuitems, cuenta } from "../../utils";
import logo_vibe from "../../assets/images/logo_recortado.png";

const MobileMenu = ({ signOut, user }) => {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <nav className="panel-mobile-menu navbar navbar-expand-lg navbar-dark bg-dark row py-2">
        <div className="container-fluid pl-0">
          <Link className="navbar-brand" to="/myadmin">
            <img src={logo_vibe} className="logo-navbar" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setDisplay(!display)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div
        className="bg-dark w-100 vh-100 drawer-menu"
        style={{
          position: "absolute",
          left: display ? 0 : "-100vw",
        }}
      >
        <ul className="navbar-nav pt-4 px-3">
          <h3 className="ps-2 text-white border-bottom pb-3">Menú</h3>
          {menuitems.map(({ name, handle }) => (
            <MobileMenuItem
              key={name}
              name={name}
              handle={handle}
              setDisplay={setDisplay}
            />
          ))}
          <h3 className="ps-2 mt-4 text-white border-bottom pb-3">Mi Cuenta</h3>
          {cuenta.map(({ name, handle }) => (
            <MobileMenuItem
              key={name}
              name={name}
              handle={handle}
              setDisplay={setDisplay}
            />
          ))}
          <li className="nav-item mobile mt-5">
            <button className="btn btn-link nav-link" onClick={signOut}>
              <i className="fa fa-sign-out-alt fa-flip-horizontal ps-2"></i>{" "}
              Salir
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
