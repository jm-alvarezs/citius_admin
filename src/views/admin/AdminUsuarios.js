import React, { useContext } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import Pagination from "../../components/global/Pagination";
import PanelTitle from "../../components/global/PanelTitle";
import UserRow from "../../components/users/UserRow";
import { UsersContext } from "../../context/UsersContext";

const AdminUsuarios = () => {
  const { users, getUsers } = useContext(UsersContext);

  const renderUsers = () => {
    if (Array.isArray(users)) {
      return users.map((user) => <UserRow key={user.user_id} user={user} />);
    }
  };

  return (
    <div className="container-fluid">
      <PanelTitle title="Usuarios" />
      <div className="card p-2 no-scale shadow">
        <HeaderRow
          headers={["Nombre", "Correo Electrónico", "Rol", "Acciones"]}
        />
        <div className="container-fluid">{renderUsers()}</div>
        <Pagination modifier={getUsers} />
      </div>
    </div>
  );
};

export default AdminUsuarios;
