import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { ModalContext } from "../../context/ModalContext";
import ExtendAccessForm from "../../components/customers/ExtendAccessForm";
import { PackagesContext } from "../../context/PackageContext";
import RemoveClassesForm from "../../components/clases/RemoveClassesForm";
import { UserContext } from "../../context/UserContext";
import ReservacionRow from "../../components/reservaciones/ReservacionRow";
import CompraRow from "../../components/customers/CompraRow";
import CustomerInfo from "../../components/customers/CustomerInfo";

const AdminSingleUsuario = ({ customer_id }) => {
  const {
    customer,
    getCustomer,
    clearCustomer,
    extenderAcceso,
    revokeAccess,
    removeClasses,
  } = useContext(CustomerContext);
  const { paquetes, getPaquetes } = useContext(PackagesContext);

  const { user } = useContext(UserContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getCustomer(customer_id);
    getPaquetes();
    return clearCustomer;
  }, []);

  const toggleModal = () => {
    modalComponent(
      "Agregar Acceso",
      <ExtendAccessForm
        customer={customer}
        extenderAcceso={extenderAcceso}
        paquetes={paquetes}
      />
    );
  };

  const confirmRemove = () => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás seguro que deseas restarle clases a {customer.first_name}? Esta
          acción NO puede deshacerse y puede generar "deuda" de créditos de
          reservaciones.
        </p>
        <RemoveClassesForm
          customer_id={customer_id}
          removeClasses={removeClasses}
        />
      </div>
    );
  };

  const confirmRevoke = (purchase) => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás seguro que deseas revocar el acceso de la compra{" "}
          {purchase.title}? Esta acción NO puede deshacerse y puede generar
          "deuda" de créditos de reservaciones.
        </p>
        <button
          className="btn btn-danger"
          onClick={() =>
            revokeAccess(purchase.purchase_id, purchase.customer_id)
          }
        >
          Revocar Acceso
        </button>
      </div>
    );
  };

  const renderUsuario = () => {
    if (customer && customer !== null) {
      return <CustomerInfo customer={customer} confirmRemove={confirmRemove} />;
    }
    return <div className="spinner-border"></div>;
  };

  const renderPaquetes = () => {
    if (customer && customer !== null) {
      if (Array.isArray(customer.purchases)) {
        return customer.purchases.map((paquete) => (
          <CompraRow
            key={paquete.purchase_id}
            paquete={paquete}
            canRevoke={!user.isManager && paquete.status !== "cancelled"}
            confirmRevoke={confirmRevoke}
          />
        ));
      }
    }
  };

  const renderReservaciones = () => {
    if (customer && customer !== null) {
      if (Array.isArray(customer.class_reservations)) {
        return customer.class_reservations.map((reservation) => (
          <ReservacionRow
            key={reservation.class_reservation_id}
            reservation={reservation}
          />
        ));
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pb-2 border-bottom mx-0 mb-3 align-items-center">
        <div className="col col-md-6 ps-0">
          <h1>Cliente</h1>
        </div>
        <div className="col col-md-6 pe-0 text-end">
          {!user.isManager && (
            <button className="btn btn-accent" onClick={toggleModal}>
              + Agregar Paquete
            </button>
          )}
        </div>
      </div>
      <div className="card no-scale mb-3">{renderUsuario()}</div>
      <div className="card no-scale my-3">
        <h3>Paquetes Comprados</h3>
        <div className="row bg-light border py-2 my-2">
          <div className="col bold">Titulo</div>
          <div className="col bold">Fecha de Compra</div>
          <div className="col bold">Total</div>
          <div className="col bold">Día de Corte / Exp.</div>
          <div className="col bold">Estado</div>
          <div className="col bold">Acciones</div>
        </div>
        {renderPaquetes()}
      </div>
      <div className="card no-scale my-3">
        <h3>Reservaciones</h3>
        <div className="row bg-light border py-2 my-2">
          <div className="col col-md-3 bold">Clase</div>
          <div className="col col-md-2 bold">Coach</div>
          <div className="col col-md-2 bold">Fecha</div>
          <div className="col col-md-3 bold">Reservada en</div>
          <div className="col col-md-2 bold">Status</div>
        </div>
        {renderReservaciones()}
      </div>
    </div>
  );
};

export default AdminSingleUsuario;
