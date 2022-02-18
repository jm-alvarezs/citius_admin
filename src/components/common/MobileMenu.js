import React, { useState } from "react";
import { Link } from "@reach/router";
import MobileMenuItem from "./MobileMenuItem";
import { adminitems, coachitems, analiticasitems } from "../../utils";
import logo_vibe from "../../assets/images/logo_blanco.png";

const MobileMenu = ({ signOut, user }) => {
  const [display, setDisplay] = useState(false);

  const renderAnaliticas = () => {
    if (user.role === "admin") {
      return (
        <div>
          <h3 className="my-3 pb-2 border-bottom text-white">Analítica</h3>
          {analiticasitems.map(({ name, handle }) => (
            <MobileMenuItem
              key={name}
              name={name}
              handle={handle}
              setDisplay={setDisplay}
            />
          ))}
        </div>
      );
    }
  };

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
          <h3 className="ps-2 text-white border-bottom pb-3 text-capitalize">
            {user.role}
          </h3>
          {["admin", "manager"].includes(user.role) &&
            adminitems.map(({ name, handle }) => (
              <MobileMenuItem
                key={name}
                name={name}
                handle={handle}
                setDisplay={setDisplay}
              />
            ))}
          {renderAnaliticas()}
          {user.role === "coach" &&
            coachitems.map(({ name, handle }) => (
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
