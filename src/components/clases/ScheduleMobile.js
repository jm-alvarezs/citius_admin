import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import ColorLegend from "../global/ColorLegend";
import ScheduleDay from "./ScheduleDay";
import { ClassInstructorContext } from "../../context/ClassInstructorContext";

const ScheduleMobile = () => {
  const [selected, setSelected] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [month, setMonth] = useState(moment().month());
  const [weeks, setWeeks] = useState("");

  const { days, getSchedule } = useContext(ClassInstructorContext);

  useEffect(() => {
    const start_date = moment(month + 1, "M")
      .startOf("month")
      .format("YYYY-MM-DD");
    const end_date = moment(month + 1, "M")
      .endOf("month")
      .format("YYYY-MM-DD");
    getSchedule(start_date, end_date);
  }, [month]);

  useEffect(() => {
    if (Array.isArray(days) && weeks === "") {
      setWeeks(Math.ceil(days.length / 7));
      setCurrentDay(moment().day());
      if (month === moment().month()) {
        const startCurrentWeek = moment().startOf("week");
        const currentDays = days.filter((day) =>
          moment(day.date).isAfter(startCurrentWeek)
        );
        const currentWeekIndex = Math.abs(
          parseInt((days.length - currentDays.length) / 7) - weeks
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

  const hasClases = (days) => {
    if (days && days !== null) {
      let total = 0;
      days.forEach((day) => {
        total += day.details.length;
      });
      return total > 0;
    }
  };

  const renderDays = () => {
    if (days && days !== null) {
      let weekStart = selected * 7;
      if (currentWeek === selected) {
        weekStart += currentDay - 1;
      }
      const week = days.slice(weekStart, weekStart + 7);
      if (!hasClases(week)) {
        return (
          <div className="row">
            <p className="px-3 mb-0">No hay clases programadas.</p>
          </div>
        );
      }
      return week.map((day) => (
        <ScheduleDay key={day.date} day={day} clases={day.details} />
      ));
    }
  };

  return (
    <div
      className="container-fluid px-0 show-mobile"
      style={{ overflowX: "hidden" }}
    >
      <div className="row">
        <div className="col-12 col-xl-2 my-2">
          <div className="row align-items-center mb-4">
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
        <div className="col-12 col-xl-10 my-2">
          <div className="row mb-4 align-items-center">
            <div className="col-6">
              {selected > currentWeek && (
                <button
                  className="btn btn-light ms-2 shadow-sm border"
                  onClick={() => {
                    if (selected > currentWeek) {
                      setSelected(selected - 1);
                    }
                  }}
                >
                  <i className="fa fa-chevron-left"></i> Anterior
                </button>
              )}
            </div>

            <div className="col-6 text-right">
              <button
                className="btn btn-light shadow-sm border"
                disabled={selected === weeks - 1}
                onClick={() => {
                  if (selected < weeks - 1) {
                    setSelected(selected + 1);
                  }
                }}
              >
                Sig. Semana <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="container-fluid schedule-mobile-container">
            <div className="schedule-mobile-wrapper">
              <div className="row">{renderDays()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMobile;
