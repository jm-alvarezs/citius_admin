import { navigate } from "@reach/router";
import React, { useContext, useEffect } from "react";
import SignUpForm from "../components/auth/SignUpForm";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user !== null && !window.location.href.includes("myadmin")) {
      navigate("/myadmin");
    }
  }, [user]);

  return (
    <div className="container-fluid bg-black">
      <div className="row">
        <div className="col-12 col-md-6 bg-black vh-100 px-0 hide-mobile bg-dark">
          <div className="bg-vibe-vertical"></div>
        </div>
        <div className="col-12 col-md-6 vh-100">
          <div className="row align-items-center vh-100">
            <div className="container-fluid">
              <h1 className="text-center my-4 text-white">¡Inscríbete!</h1>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
