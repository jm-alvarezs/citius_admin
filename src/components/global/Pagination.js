import React, { useState, useEffect } from "react";

const Pagination = ({ modifier }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    modifier(page);
  }, [page]);

  return (
    <div className="container-fluid text-right px-0 mt-3">
      <button
        className="btn btn-light border mx-2"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      {page}
      <button
        className="btn btn-light border mx-2"
        onClick={() => setPage(page + 1)}
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
