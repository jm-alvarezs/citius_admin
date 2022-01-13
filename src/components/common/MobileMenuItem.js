import React from "react";
import { navigate } from "@reach/router";

const MobileMenuItem = ({ setDisplay, name, handle }) => {
  return (
    <li
      className="nav-item mobile"
      onClick={() => {
        setDisplay(false);
        navigate(handle);
      }}
    >
      <div className="row align-items-center">
        <div className="col-10">{name}</div>
        <div className="col-2 text-end">
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
    </li>
  );
};

export default MobileMenuItem;
