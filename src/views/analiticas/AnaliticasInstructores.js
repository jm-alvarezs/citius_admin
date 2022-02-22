import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AnaliticasContext } from "../../context/AnaliticasContext";
import { BASE_URL } from "../../utils";

const AnaliticasInstructores = () => {
  const [inicio, setInicio] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [fin, setFin] = useState(moment().endOf("month").format("YYYY-MM-DD"));
  const { instructores, getInstructores, clearInstructores } =
    useContext(AnaliticasContext);

  useEffect(() => {
    getInstructores(inicio, fin);
  }, []);

  useEffect(() => {
    clearInstructores();
    getInstructores(inicio, fin);
  }, [inicio, fin]);

  const renderInstructores = () => {
    if (instructores && instructores !== null) {
      return instructores
        .filter((instructor) => instructor.name !== null)
        .map((instructores) => (
          <div className="row my-2">
            <div className="col">{instructores.name}</div>

            <div className="col">{instructores.booked}</div>
            <div className="col">{instructores.attended}</div>
          </div>
        ));
    }
  };

  return (
    <div className="container-fluid px-0 mt-3">
      <h2 className="border-bottom pb-3 mb-3">Instructores</h2>
      <div className="row">
        <div className="container-fluid">
          <div className="card p-3 me-3 no-scale shadow-sm">
            <div className="row align-items-center pb-3">
              <div className="col-12 col-md-6">
                <h4>Alumnos por Instructor</h4>
              </div>
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-6 text-right">
                    <a
                      href={`${BASE_URL}/analiticas/instructores?fecha_inicio=${inicio}&fecha_fin=${fin}`}
                      className="btn btn-outline-secondary me-4"
                    >
                      <i className="far fa-file-excel"></i>
                    </a>
                    <label className="bold d-inline">Desde</label>
                    <input
                      type="date"
                      className="form-control d-inline ms-3 w-50"
                      value={moment(inicio).format("YYYY-MM-DD")}
                      onChange={(e) =>
                        setInicio(moment(e.target.value).format("YYYY-MM-DD"))
                      }
                    />
                  </div>
                  <div className="col-6 text-right">
                    <label className="bold d-inline">Hasta</label>
                    <input
                      type="date"
                      className="form-control d-inline ms-3 w-50"
                      value={moment(fin).format("YYYY-MM-DD")}
                      onChange={(e) =>
                        setFin(moment(e.target.value).format("YYYY-MM-DD"))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row bold bg-light border py-2 mb-2">
              <div className="col">Nombre</div>

              <div className="col">Reservados</div>
              <div className="col">Asistentes</div>
            </div>
            {renderInstructores()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliticasInstructores;
