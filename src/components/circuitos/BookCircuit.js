import React, { useContext, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

const BookCircuit = ({ available_circuit }) => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const { redeemCircuit } = useContext(CustomerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    redeemCircuit(
      available_circuit.customer_id,
      available_circuit.available_circuit_id,
      date
    );
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid px-0">
      <label>Fecha y Hora</label>
      <DateTimePicker
        onChange={(class_date) => setDate(class_date)}
        value={date === "" ? date : moment(date).toDate()}
        className="form-control mb-3"
      />
      <button type="submit" className="btn btn-accent">
        Agendar
      </button>
    </form>
  );
};

export default BookCircuit;
