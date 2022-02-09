import moment from "moment";
import React, { useEffect, useState, useContext } from "react";
import { CoachesContext } from "../../context/CoachesContext";
import { CustomerContext } from "../../context/CustomerContext";
import { BASE_URL } from "../../utils";
import BirthdateInput from "../common/BirthdateInput";

const CoachForm = ({ idCoach }) => {
  const { customers, getCustomersByQuery } = useContext(CustomerContext);
  const { coach, getCoach, createCoach, postCoach, setPropiedadCoach } =
    useContext(CoachesContext);

  const [customer, setCustomer] = useState(null);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query !== "") {
      getCustomersByQuery(query);
    }
  }, [query]);

  useEffect(() => {
    if (isNaN(idCoach)) {
      createCoach();
    } else {
      getCoach(idCoach);
    }
  }, [idCoach]);

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSrc(null);
    }
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postCoach({ ...coach, file, customer });
  };

  const renderFile = () => {
    if (coach && coach !== null) {
      if (coach.idAdjunto !== null) {
        return (
          <img
            src={`${BASE_URL}/adjuntos/${coach.idAdjunto}`}
            className="mw-100 w-100 d-block m-auto"
          />
        );
      }
      if (src !== null) {
        return <img src={src} className="mw-100 w-100 d-block m-auto" />;
      }
    }
  };

  const renderCustomers = () => {
    if (customer !== null) {
      return (
        <div className="container-fluid px-0 mb-3">
          <p>
            {customer.name} {customer.last_name}
          </p>
          <p>{customer.email}</p>
        </div>
      );
    }
    if (customers && customers !== null) {
      return customers.map((customer) => (
        <div key={customer.customer_id} className="row align-items-center">
          <div className="col col-md-4">
            {customer.name} {customer.last_name}
          </div>
          <div className="col col-md-4 small">{customer.email}</div>
          <div className="col col-md-4 text-end">
            <button
              className="btn btn-outline-dark"
              onClick={() => setCustomer(customer)}
            >
              + Conectar
            </button>
          </div>
        </div>
      ));
    }
  };

  const renderForm = () => {
    if (coach && coach !== null) {
      const { name, last_name, nick_name, birthdate, short_bio } = coach;
      return (
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setPropiedadCoach("name", e.target.value)}
          />
          <label>Apellidos</label>
          <input
            type="text"
            className="form-control mb-3"
            value={last_name}
            onChange={(e) => setPropiedadCoach("last_name", e.target.value)}
          />
          <label>Fotografía</label>
          <div className="row mb-4">
            <div className="col-4">{renderFile()}</div>
            <div className="col-8">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <label>Fecha de Nacimiento</label>
          <BirthdateInput
            value={birthdate}
            modifier={(value) => setPropiedadCoach("birthdate", value)}
          />
          <label>Apodo</label>
          <input
            type="text"
            className="form-control mb-3"
            value={nick_name}
            onChange={(e) => setPropiedadCoach("nick_name", e.target.value)}
          />
          <label>Bio</label>
          <textarea
            rows="5"
            className="form-control mb-3"
            value={short_bio}
            onChange={(e) => setPropiedadCoach("short_bio", e.target.value)}
          />
          {!isNaN(idCoach) && (
            <div>
              <label>Asignar Usuario a Coach</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {renderCustomers()}
            </div>
          )}
          <button type="submit" className="btn btn-dark">
            Guardar
          </button>
        </form>
      );
    }
  };

  return <div className="container-fluid px-0">{renderForm()}</div>;
};

export default CoachForm;
