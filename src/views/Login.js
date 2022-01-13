import { navigate } from "@reach/router";
import React, { useContext, useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user !== null && !window.location.href.includes("myadmin")) {
      navigate("/myadmin");
    }
  }, [user]);

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-12 col-md-6 bg-black vh-100 px-0 hide-mobile bg-dark">
          <div className="bg-vertical"></div>
        </div>
        <div className="col-12 col-md-6 vh-100">
          <div className="row align-items-center vh-100">
            <div className="container-fluid">
              <h1 className="text-center my-4">Administrador CITIUS</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
