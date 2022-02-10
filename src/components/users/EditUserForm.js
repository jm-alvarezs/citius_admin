import React, { useState, useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import { hideModal } from "../../utils";

const EditUserForm = ({ user }) => {
  const [role, setRole] = useState("admin");

  const { updateUser } = useContext(UsersContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.user_id, role);
  };

  return (
    <form onSubmit={handleSubmit}>
      {user !== null && <p>{user.customer.email}</p>}
      <label>Rol</label>
      <select
        className="form-control mb-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="coach">Coach</option>
      </select>
      <div className="row mt-3">
        <div className="col-6">
          <button type="submit" className="btn btn-accent">
            Guardar
          </button>
        </div>
        <div className="col-6 text-right">
          <button
            type="button"
            onClick={hideModal}
            className="btn btn-link text-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
