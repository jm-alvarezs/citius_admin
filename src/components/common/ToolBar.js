import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import HelpForm from "../global/HelpForm";

const ToolBar = () => {
  const { modalComponent } = useContext(ModalContext);

  const toggleMusic = () => {
    let music = window.localStorage.getItem("music");
    if (music !== null) {
      music = !music === "true";
    } else {
      music = "false";
    }
    window.localStorage.setItem("music", music);
  };

  const toggleHelp = () => {
    modalComponent("Asistencia", <HelpForm />);
  };

  return (
    <div className="tool-bar">
      <button
        className="btn btn-light btn-round d-block mb-3"
        onClick={toggleMusic}
      >
        <i className="fa fa-music"></i>
      </button>
      <button
        className="btn btn-primary btn-round d-block mb-3"
        onClick={toggleHelp}
      >
        <i className="fa fa-comments"></i>
      </button>
    </div>
  );
};

export default ToolBar;
