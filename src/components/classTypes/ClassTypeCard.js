import React from "react";

const ClassTypeCard = ({ class_type }) => {
  return (
    <div key={class_type.class_type_id} className="col-12 col-md-3 p-2">
      <div
        className="card text-white"
        style={{
          backgroundColor:
            class_type.color !== null ? class_type.color : "#000",
        }}
      >
        <h4 className="border-bottom pb-3 mb-3">
          {class_type.name} <i className={class_type.icon}></i>
        </h4>
        <p>{class_type.description}</p>
      </div>
    </div>
  );
};

export default ClassTypeCard;
