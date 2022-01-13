import { Link } from "@reach/router";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Recuperar = () => {
  const [email, setEmail] = useState("");
  const { spinner, recoverPassword } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    recoverPassword(email);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6 bg-black vh-100 px-0 hide-mobile">
          <img className="mw-100 w-100 vh-100 login-image" alt="login fondo" />
        </div>
        <div className="col-12 col-md-6 vh-100">
          <div className="row align-items-center vh-100">
            <div className="container-fluid">
              <h1 className="text-center my-4">¡Recupera tu cuenta!</h1>
              <div
                id="login-card"
                className="card no-scale text-left shadow p-4"
              >
                <form onSubmit={handleSubmit}>
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    value="Entrar"
                  >
                    {spinner ? (
                      <div className="spinner-border"></div>
                    ) : (
                      "Recuperar"
                    )}
                  </button>
                </form>
                <div className="container-fluid px-0 mt-4">
                  ¿Ya tienes cuenta? <Link to="/entrar">Inicia Sesión</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recuperar;
