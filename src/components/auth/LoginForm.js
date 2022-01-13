import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { spinner, signIn } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div id="login-card" className="card no-scale text-left shadow p-4">
      <form onSubmit={handleSubmit}>
        <label>Correo Electrónico</label>
        <input
          type="email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          Contraseña{" "}
          <button
            className="btn btn-link text-muted text-left text-small py-0 mb-1"
            onClick={(e) => {
              e.preventDefault();
              togglePassword();
            }}
          >
            <span className="text-montserrat text-small text-auto">
              {showPassword ? "Ocultar" : "Mostrar"}
            </span>
          </button>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-accent" value="Entrar">
          {spinner ? <div className="spinner-border"></div> : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
