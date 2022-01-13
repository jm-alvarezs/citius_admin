import React, { useEffect, useContext } from "react";
import { HomeContext } from "../context/HomeContext";
import { navigate } from "@reach/router";
import Footer from "../components/global/Footer";
import PaqueteCard from "../components/paquetes/PaquetesCard";
import { ClassInstructorContext } from "../context/ClassInstructorContext";
import Schedule from "../components/clases/Schedule";
import { LocationsContext } from "../context/LocationsContext";
import { Link } from "@reach/router";

const Landing = () => {
  const { presenciales, getPresenciales } = useContext(HomeContext);

  const { days, getSchedule } = useContext(ClassInstructorContext);

  const { locations, getLocations } = useContext(LocationsContext);

  useEffect(() => {
    getSchedule();
    getLocations();
    getPresenciales();
  }, []);

  const toCheckout = (package_class_id) => {
    navigate(`/checkout/${package_class_id}`);
  };

  const renderPresenciales = () => {
    if (presenciales && presenciales !== null) {
      return presenciales.map((presencial) => (
        <PaqueteCard
          key={presencial.package_class_id}
          paquete={presencial}
          action={() => toCheckout(presencial.package_class_id)}
        />
      ));
    }
  };

  return (
    <div id="landing">
      <div id="video" className="row align-items-center">
        <div className="container-fluid text-center main-cta-cont">
          <Link
            id="main-cta"
            to="/entrar"
            className="btn btn-accent bold btn-lg m-auto landing-button"
          >
            GET ACCESS NOW!
          </Link>
        </div>
      </div>
      <div id="about" className="about-vibe p-4 row align-items-center">
        <div className="container mw-1400">
          <h2>Bike Vibe</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="container px-2 p-4" id="calendario">
        <h2 className="mb-0">Calendario de Clases</h2>
        <div className="row">{renderPresenciales()}</div>
      </div>
      <div className="container px-2 p-4">
        <Schedule
          days={days}
          locations={locations}
          isHome={true}
          hidePrevious
        />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
