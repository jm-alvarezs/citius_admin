import React from "react";
import { Link } from "@reach/router";
import { BASE_URL, S3_ENDPOINT } from "../../utils";

const ClassTypeCard = ({ classType, disabled, length }) => {
  return (
    <div
      className={`col-12 col-sm-12 col-md-12 ${
        length % 3 === 0 ? "col-lg-4" : "col-lg-6"
      } text-center my-2`}
    >
      <Link
        to={disabled ? `/mycitius/paquetes` : `./videos/${classType.handle}`}
        className="d-block card class-type px-0 py-0"
      >
        <img
          src={`${S3_ENDPOINT}/${classType.nombre_adjunto}.${classType.tipo_adjunto}`}
          className="mw-100 w-100 select-image"
          alt={classType.name}
        />
        <div
          className={`row align-items-center h-100 mx-0 class-card ${
            disabled ? "type-disabled" : "select-overlay"
          }`}
        >
          <h4 className="select-title">
            {classType.name} <br />
            {disabled && <i className="fa fa-lock fa-2x"></i>}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default ClassTypeCard;
