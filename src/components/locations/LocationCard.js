import React from "react";

const LocationCard = ({ location }) => {
  return (
    <div className="p-2 col-md-3">
      <div
        className={`card location-card h-100 ${
          location.location_id === 1 ? "bg-nude text-white" : ""
        }`}
      >
        <h3>{location.description}</h3>
        <p>{location.address}</p>
      </div>
    </div>
  );
};

export default LocationCard;
