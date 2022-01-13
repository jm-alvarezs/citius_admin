import React from "react";

const MapaLugares = ({ rows, place, setPlace, icon, taken_spots }) => {
  const total = rows.reduce((a, b) => a + b);

  const getCurrentLugar = (rowIndex, index) => {
    return rowIndex > 0
      ? total - getSum(rowIndex) + index - rows[rowIndex] + 1
      : total - index;
  };

  const getSum = (rowIndex) => {
    let sum = 0;
    for (let i = 0; i < rowIndex; i++) {
      sum += rows[i];
    }
    return sum;
  };

  return (
    <div>
      <p className="bold">{icon ? "Selecciona tu Lugar" : "Lugares"}</p>
      {rows.map((cols, rowIndex) => (
        <div key={rowIndex} className="row my-3">
          {new Array(cols).fill(1).map((one, index) => (
            <div key={index} className={`col-${12 / cols} mb-3 text-center`}>
              <button
                className={`btn btn-${
                  Array.isArray(taken_spots) &&
                  Array.from(taken_spots).includes(
                    `${getCurrentLugar(rowIndex, index)}`
                  )
                    ? "secondary"
                    : place === `${getCurrentLugar(rowIndex, index)}`
                    ? "dark"
                    : "light"
                }`}
                onClick={() => setPlace(`${getCurrentLugar(rowIndex, index)}`)}
                disabled={
                  Array.isArray(taken_spots) &&
                  Array.from(taken_spots).includes(
                    `${getCurrentLugar(rowIndex, index)}`
                  )
                }
              >
                {icon && (
                  <i
                    className={`${icon} ${
                      Array.isArray(taken_spots) &&
                      Array.from(taken_spots).includes(
                        `${getCurrentLugar(rowIndex, index)}`
                      )
                        ? "text-dark"
                        : place === `${getCurrentLugar(rowIndex, index)}`
                        ? "text-accent"
                        : "text-success"
                    }`}
                  />
                )}
                <p className="mb-0">{`${getCurrentLugar(rowIndex, index)}`}</p>
              </button>
            </div>
          ))}
        </div>
      ))}
      <div className="container-fluid px-0 py-1 bg-dark text-center mb-3">
        <p className="text-accent mb-0 small bold">Coach</p>
      </div>
    </div>
  );
};

export default MapaLugares;
