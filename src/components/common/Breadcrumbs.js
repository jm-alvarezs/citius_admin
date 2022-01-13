import { Link } from "@reach/router";
import React from "react";

const Breadcrumbs = ({ elements }) => {
  return (
    <div className="container-fluid px-0 mt-3">
      <p className="bold mb-0">Regresar a</p>
      {elements.map((element, index) => (
        <>
          {index > 0 ? " > " : ""}
          <Link
            key={index}
            className="bg-primary hover-white shadow-sm badge no-decoration"
            to={element.href}
          >
            <span className="bold">{element.prefix}: </span>
            {element.name}
          </Link>
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
