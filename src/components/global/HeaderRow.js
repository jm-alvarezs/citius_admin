import React from "react";

const HeaderRow = ({ headers }) => {
  const renderColumns = () => {
    if (Array.isArray(headers)) {
      return headers.map((header, index) => (
        <div key={index} className="col">
          {header}
        </div>
      ));
    }
  };

  return (
    <div className="row border bg-light py-1 mx-0 bold mt-3">
      {renderColumns()}
    </div>
  );
};

export default HeaderRow;
