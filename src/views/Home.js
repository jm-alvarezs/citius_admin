import React from "react";
import Navbar from "../components/global/Navbar";
import Landing from "./Landing";

const Home = () => {
  return (
    <div className="container-fluid px-0">
      <Navbar />
      <Landing path="/" default />
    </div>
  );
};

export default Home;
