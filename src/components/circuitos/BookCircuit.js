import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { CircuitContext } from "../../context/CircuitContext";
import { CoachesContext } from "../../context/CoachesContext";
import moment from "moment";
import { CustomerContext } from "../../context/CustomerContext";

const BookCircuit = ({ available_circuit }) => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [circuit, setCircuit] = useState(null);
  const [instructor, setInstructor] = useState(null);

  const { redeemCircuit } = useContext(CustomerContext);

  const { coaches, getCoaches } = useContext(CoachesContext);

  const { circuits, getCircuits } = useContext(CircuitContext);

  useEffect(() => {
    getCoaches();
    getCircuits();
  }, []);

  useEffect(() => {
    if (circuit === null) {
      if (Array.isArray(circuits)) {
        if (circuits.length > 0) {
          setCircuit(circuits[0].circuit_id);
        }
      }
    }
    if (instructor === null) {
      if (Array.isArray(coaches)) {
        if (coaches.length > 0) {
          setInstructor(coaches[0].instructor_id);
        }
      }
    }
  }, [circuits, coaches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    redeemCircuit(
      available_circuit.customer_id,
      available_circuit.available_circuit_id,
      date,
      circuit,
      instructor
    );
  };

  const renderCircuits = () => {
    if (Array.isArray(circuits)) {
      return circuits.map((circuit) => (
        <option key={circuit.circuit_id} value={circuit.circuit_id}>
          {circuit.name}
        </option>
      ));
    }
  };

  const renderInstructores = () => {
    if (Array.isArray(coaches)) {
      return coaches.map((coach) => (
        <option key={coach.instructor_id} value={coach.instructor_id}>
          {coach.name} {coach.last_name}
        </option>
      ));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid px-0">
      <label>Fecha y Hora</label>
      <DateTimePicker
        onChange={(class_date) => setDate(class_date)}
        value={date === "" ? date : moment(date).toDate()}
        className="form-control mb-3"
      />
      <label>Circuito</label>
      <select
        className="form-control mb-3"
        value={circuit}
        onChange={(e) => setCircuit(e.target.value)}
      >
        {renderCircuits()}
      </select>
      <label>Instructor</label>
      <select
        className="form-control mb-3"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
      >
        {renderInstructores()}
      </select>
      <button type="submit" className="btn btn-accent">
        Agendar
      </button>
    </form>
  );
};

export default BookCircuit;
