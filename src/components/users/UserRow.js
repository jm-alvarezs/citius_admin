import React from "react";

const UserRow = ({ user }) => {
  return (
    <div className="row py-2 small hover-light border-bottom align-items-center">
      <div className="col">
        {user.customer.name} {user.customer.last_name}
      </div>
      <div className="col">{user.customer.email}</div>
      <div className="col text-capitalize">{user.role}</div>
      <div className="col">
        <button className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-edit"></i> Editar
        </button>

        <button className="btn btn-outline-danger mx-3 btn-sm">
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  );
};

export default UserRow;
