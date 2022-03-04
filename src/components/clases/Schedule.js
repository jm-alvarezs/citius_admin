import React, { useState, useEffect, useContext } from "react";
import ScheduleWeek from "./ScheduleWeek";
import moment from "moment";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";

const Schedule = ({ locations, isHome }) => {
  const [selected, setSelected] = useState(0);
  const [ubicacion, setUbicacion] = useState("");
  const [filtered, setFiltered] = useState(true);
  const [currentDay, setCurrentDay] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weeks, setWeeks] = useState("");
  const [month, setMonth] = useState(moment().month());

  const { days, getSchedule } = useContext(ClassInstructorContext);

  useEffect(() => {
    const start_date = moment(month + 1, "M")
      .startOf("month")
      .startOf("isoWeek")
      .format("YYYY-MM-DD");
    const end_date = moment(month + 1, "M")
      .endOf("month")
      .endOf("isoWeek")
      .format("YYYY-MM-DD");
    getSchedule(start_date, end_date);
  }, [month]);

  useEffect(() => {
    if (Array.isArray(days)) {
      const weeksNumber = Math.ceil(days.length / 7);
      setWeeks(weeksNumber);
      setCurrentDay(moment().day());
      if (month === moment().month()) {
        const startCurrentWeek = moment().startOf("week");
        const currentDays = days.filter((day) =>
          moment(day.date).isAfter(startCurrentWeek)
        );
        const currentWeekIndex = Math.abs(
          parseInt((days.length - currentDays.length) / 7)
        );
        setCurrentWeek(currentWeekIndex);
        if (currentWeekIndex > 0) {
          setSelected(currentWeekIndex);
        }
      } else {
        setSelected(0);
      }
    }
  }, [days]);

  const renderDays = () => {
    if (days && days !== null && weeks !== "") {
      let weekStart = selected * 7;
      if (currentWeek === selected) {
        weekStart += currentDay - 1;
      }
      const week = days.slice(weekStart, weekStart + 7);
      if (!hasClases(week)) {
        return (
          <div className="row">
            <p className="px-0 mb-0 text-center">No hay clases programadas.</p>
          </div>
        );
      }
      return (
        <ScheduleWeek
          week={week}
          location={ubicacion}
          isHome={isHome}
          filtered={filtered}
        />
      );
    }
  };

  const renderLocations = () => {
    if (Array.isArray(locations)) {
      if (locations.length > 1) {
        return (
          <div className="form-group mb-4">
            <label>Buscar por estudio</label>
            <select
              className="form-control"
              onChange={(e) => setUbicacion(e.target.value)}
            >
              {renderEstudios()}
            </select>
          </div>
        );
      }
    }
  };

  const renderEstudios = () => {
    if (locations && locations !== null) {
      return [
        <option key="all" value="">
          Todos los Estudios
        </option>,
        ...locations.map((location) => (
          <option key={location.location_id} value={location.location_id}>
            {location.name}
          </option>
        )),
      ];
    }
  };

  const hasClases = (days) => {
    if (days && days !== null) {
      let total = 0;
      days.forEach((day) => {
        total += day.details.length;
      });
      return total > 0;
    }
  };

  return (
    <div
      className="container-fluid px-0 hide-mobile"
      style={{ overflowX: "hidden" }}
    >
      <div className="container-fluid">
        <div className="row align-items-center mt-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="row align-items-center">
              <div className="col-4">
                <button
                  className="btn btn-light border"
                  disabled={month === 0}
                  onClick={() => {
                    if (month > 0) {
                      setMonth(month - 1);
                    }
                  }}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
              </div>
              <div className="col-4">
                <h2 className="mb-0">{moment(month + 1, "M").format("MMM")}</h2>
              </div>
              <div className="col-4 text-right">
                <button
                  className="btn btn-light border"
                  disabled={month === 11}
                  onClick={() => setMonth(month + 1)}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="row align-items-center">
              <div className="col-4 text-center">
                <button
                  className="btn btn-light shadow-sm border"
                  disabled={selected === currentWeek}
                  onClick={() => {
                    if (selected > currentWeek) {
                      setSelected(selected - 1);
                    }
                  }}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
              </div>
              <div className="col-4 text-center">
                <h4 className="mb-0">Semana {selected + 1}</h4>
              </div>
              <div className="col-4 text-center">
                <button
                  className="btn btn-light shadow-sm border"
                  disabled={selected === weeks - 1}
                  onClick={() => {
                    if (selected < weeks - 1) {
                      setSelected(selected + 1);
                    }
                  }}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {renderLocations()}
      </div>
      <div className="container-fluid">
        <div className="container-fluid ps-0">{renderDays()}</div>
      </div>
    </div>
  );
};

export default Schedule;
