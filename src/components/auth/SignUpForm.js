import React, { useState, useContext } from "react";
import { Link } from "@reach/router";
import { UserContext } from "../../context/UserContext";

const SignUpForm = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [telefono, setTelefono] = useState("");
  const { spinner, signUp } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(nombre, email, password, telefono);
  };
  return (
    <>
      <div id="login-card" className="vibe-card no-scale text-left shadow p-4">
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label>Correo Electrónico</label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control mb-3"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label>Teléfono (WhatsApp)</label>
          <input
            type="tel"
            className="form-control mb-3"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <button type="submit" className="btn btn-accent" value="Entrar">
            {spinner ? <div className="spinner-border"></div> : "Regístrate"}
          </button>
        </form>
        <div className="container-fluid px-0 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/entrar" className="text-accent">
            Inicia Sesión
          </Link>
        </div>
      </div>
      <p className="mt-4 mw-500 d-block m-auto">
        <span className="text-white">¿Necesitas recuperar tu cuenta?</span>{" "}
        <Link to="/recuperar" className="text-accent">
          Haz click aquí
        </Link>
      </p>
    </>
  );
};

export default SignUpForm;
