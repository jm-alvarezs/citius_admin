import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark py-3 text-white">
      <div className="row">
        <div className="col-12 col-md-4 mobile-center my-2">
          &copy; 2021 Vibe N Ride
        </div>
        <div className="col-12 col-md-4 text-center my-2">
          Términos y Condiciones
        </div>
        <div className="col-12 col-md-4 mobile-center text-end my-2">
          <i className="fab fa-facebook footer-icon mx-2"></i>
          <i className="fab fa-instagram footer-icon mx-2"></i>
          <i className="fab fa-twitter footer-icon mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
