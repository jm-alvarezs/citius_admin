import { Link } from "@reach/router";
import React from "react";
import logo_recortado from "../../assets/images/logo_recortado.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-2 mw-100">
      <div className="container-fluid navbar-container">
        <a className="navbar-brand" href="#landing">
          <img src={logo_recortado} className="logo-navbar" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mw-100" id="navbarNav">
          <div className="container-fluid">
            <div className="row">
              <div className="col col-md-8 col-xl-10">
                <ul className="navbar-nav ">
                  <li className="nav-item">
                    <a className="nav-link" href="#about">
                      Nosotros
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#calendario">
                      Horarios
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#paquetes">
                      Paquetes
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col col-md-4 col-xl-2 text-right">
                <Link
                  className="btn btn-accent bold navbar-cta text-uppercase"
                  to="/entrar"
                >
                  Acceder
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
