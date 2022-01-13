import React from "react";
import { Link } from "@reach/router";
import logo from "../../assets/images/logo_blanco.png";

const PanelNavbar = ({ user, signOut }) => {
  return (
    <nav className="bg-dark hide-mobile side-menu">
      <div className="container-fluid px-0">
        <div className="px-3">
          <Link to="/" className="navbar-brand" href="#landing">
            <img src={logo} className="thumbnail" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="text-white">
          <ul className="side-menu-list">
            <li className="nav-item text-item">
              <Link to="/myadmin/clases" className="nav-link">
                Clases
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/asistentes" className="nav-link">
                Asistentes
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/clientes" className="nav-link">
                Clientes
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/paquetes" className="nav-link">
                Paquetes
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/coaches" className="nav-link">
                Coaches
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/especiales" className="nav-link">
                Especiales
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/descuentos" className="nav-link">
                Descuentos
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/tipos" className="nav-link">
                Tipos de Clase
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/users" className="nav-link">
                Usuarios
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/orders" className="nav-link">
                Órdenes
              </Link>
            </li>
            <li className="nav-item text-item">
              <Link to="/myadmin/analytics" className="nav-link">
                Analíticas
              </Link>
            </li>
            {user !== null && user.isAdmin && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarAnaliticas"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Analiticas
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarAnaliticas"
                >
                  <li>
                    <Link to="./analiticas/inscritos" className="dropdown-item">
                      Inscritos
                    </Link>
                  </li>
                  <li>
                    <Link to="./analiticas/ingresos" className="dropdown-item">
                      Ventas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="./analiticas/reservaciones"
                      className="dropdown-item"
                    >
                      Reservaciones
                    </Link>
                  </li>
                  <li>
                    <Link to="./analiticas/inscritos" className="dropdown-item">
                      Coaches
                    </Link>
                  </li>
                  <li>
                    <Link to="./analiticas/inscritos" className="dropdown-item">
                      Clases
                    </Link>
                  </li>
                  <li>
                    <Link to="./analiticas/inscritos" className="dropdown-item">
                      Paquetes
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {String(user.customer.name).substr(0, 20)}
                {String(user.customer.name).length > 20 ? "..." : ""}
                <i className="ms-2 fa fa-user-circle"></i>
              </a>
              <ul
                className="dropdown-menu user-menu"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={signOut}
                  >
                    Salir <i className="ms-2 fa fa-sign-out-alt"></i>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PanelNavbar;