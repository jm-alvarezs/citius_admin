import React, { useEffect, useState, useContext } from "react";
import { CoachesContext } from "../../context/CoachesContext";
import { UsersContext } from "../../context/UsersContext";
import { BASE_URL } from "../../utils";
import BirthdateInput from "../common/BirthdateInput";

const CoachForm = ({ idCoach }) => {
  const { users, getUsers } = useContext(UsersContext);
  const { coach, getCoach, createCoach, postCoach, setPropiedadCoach } =
    useContext(CoachesContext);

  const [customer, setCustomer] = useState(null);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchCoach(idCoach);
  }, []);

  useEffect(() => {
    if (query !== "") {
      getUsers({ query });
    }
  }, [query]);

  useEffect(() => {
    fetchCoach(idCoach);
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

  const fetchCoach = (idCoach) => {
    if (isNaN(idCoach)) {
      createCoach();
    } else {
      getCoach(idCoach);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCoach({ ...coach, file });
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
    if (coach.user_id !== null) {
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
      if (coach.user !== null) {
        let { user } = coach;
        return (
          <div className="container-fluid px-0">
            <h5>Usuario conectado</h5>
            <div className="row align-items-center mb-3">
              <div className="col-6">
                <p>
                  {user.customer.name} {user.customer.last_name}
                </p>
                <p>{user.customer.email}</p>
              </div>
              <div className="col-6 text-right">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setPropiedadCoach("user_id", null)}
                >
                  <i className="fa fa-times me-1"></i> Desconectar
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
    if (users && users !== null) {
      return users.map(({ user_id, customer }) => (
        <div key={customer.customer_id} className="row align-items-center">
          <div className="col col-md-4">
            {customer.name} {customer.last_name}
          </div>
          <div className="col col-md-4 small">{customer.email}</div>
          <div className="col col-md-4 text-end">
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                setPropiedadCoach("user_id", user_id);
                setCustomer(customer);
              }}
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
          <button type="submit" className="btn btn-accent mt-2">
            Guardar
          </button>
        </form>
      );
    }
  };

  return <div className="container-fluid px-0">{renderForm()}</div>;
};

export default CoachForm;
