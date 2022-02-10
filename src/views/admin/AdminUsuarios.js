import React, { useContext } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import Pagination from "../../components/global/Pagination";
import PanelTitle from "../../components/global/PanelTitle";
import EditUserForm from "../../components/users/EditUserForm";
import UserForm from "../../components/users/UserForm";
import UserRow from "../../components/users/UserRow";
import { ModalContext } from "../../context/ModalContext";
import { UsersContext } from "../../context/UsersContext";

const AdminUsuarios = () => {
  const { users, getUsers, deleteUser } = useContext(UsersContext);

  const { modalComponent } = useContext(ModalContext);

  const handleCreate = () => {
    modalComponent("Agregar Usuario", <UserForm />);
  };

  const handleEdit = (user) => {
    modalComponent("Editar Usuario", <EditUserForm user={user} />);
  };

  const confirmDelete = (user) => {
    modalComponent(
      "Eliminar Usuario",
      <div>
        <p>
          ¿Estás seguro que deseas eliminar al usuario {user.customer.email}?
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteUser(user.user_id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderUsers = () => {
    if (Array.isArray(users)) {
      return users.map((user) => (
        <UserRow
          key={user.user_id}
          user={user}
          editUser={handleEdit}
          deleteUser={confirmDelete}
        />
      ));
    }
  };

  return (
    <div className="container-fluid">
      <PanelTitle title="Usuarios" onClick={handleCreate} />
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
