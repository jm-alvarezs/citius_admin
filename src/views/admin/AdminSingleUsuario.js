import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { ModalContext } from "../../context/ModalContext";
import ExtendAccessForm from "../../components/customers/ExtendAccessForm";
import { PackagesContext } from "../../context/PackageContext";
import { UserContext } from "../../context/UserContext";
import ReservacionRow from "../../components/reservaciones/ReservacionRow";
import CompraRow from "../../components/customers/CompraRow";
import CustomerInfo from "../../components/customers/CustomerInfo";
import HeaderRow from "../../components/global/HeaderRow";
import InvoiceRow from "../../components/invoices/InvoiceRow";
import { PurchasesContext } from "../../context/PurchasesContext";
import RevokeForm from "../../components/purchases/RevokeForm";
import { hideModal } from "../../utils";
import CircuitoRow from "../../components/circuitos/CircuitoRow";
import BookCircuit from "../../components/circuitos/BookCircuit";

const AdminSingleUsuario = ({ customer_id }) => {
  const {
    customer,
    getCustomer,
    clearCustomer,
    extenderAcceso,
    deleteCustomer,
  } = useContext(CustomerContext);
  const { paquetes, getPaquetes } = useContext(PackagesContext);

  const { user } = useContext(UserContext);

  const { modalComponent } = useContext(ModalContext);

  const { cancelPurchase } = useContext(PurchasesContext);

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

  const confirmDelete = () => {
    modalComponent(
      "Precaución",
      <div>
        <p>
          ¿Estás segura que deseas eliminar el cliente {customer.name}{" "}
          {customer.last_name} con el correo {customer.email}?
        </p>
        <p>Esta acción NO puede deshacerse.</p>
        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-danger"
              onClick={() => deleteCustomer(customer_id)}
            >
              <i className="fa fa-trash"></i> Eliminar Cliente
            </button>
          </div>
          <div className="col-6 text-right">
            <button className="btn btn-link text-secondary" onClick={hideModal}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const confirmRevoke = (purchase) => {
    modalComponent(
      "Precaución",
      <RevokeForm
        purchase={purchase}
        customer_id={customer_id}
        cancelPurchase={cancelPurchase}
      />
    );
  };

  const handleBook = (available_circuit) => {
    modalComponent(
      "Agendar Circuito",
      <BookCircuit available_circuit={available_circuit} />
    );
  };

  const renderCircuitos = () => {
    if (customer && customer !== null) {
      if (Array.isArray(customer.available_circuits)) {
        return customer.available_circuits.map((circuit) => (
          <CircuitoRow
            key={circuit.available_circuit_id}
            circuit={circuit}
            handleBook={handleBook}
          />
        ));
      }
    }
  };

  const renderUsuario = () => {
    if (customer && customer !== null) {
      return <CustomerInfo customer={customer} />;
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

  const renderInvoices = () => {
    if (customer && customer !== null) {
      const { invoices } = customer;
      if (Array.isArray(invoices)) {
        if (invoices.length === 0) {
          return (
            <p className="mb-0 mx-2 mt-2">No hay cargos en estas fechas.</p>
          );
        }
        return invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.invoice_id}
            invoice={invoice}
            customer_id={customer_id}
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
        <h3 className="mb-1">Paquetes Comprados</h3>
        <HeaderRow
          headers={[
            "# Compra",
            "Paquete",
            "Fecha",
            "Precio",
            "Día de Corte / Exp",
            "Estado",
            "Acciones",
          ]}
        />
        {renderPaquetes()}
      </div>
      <div className="card no-scale my-3">
        <h3 className="mb-1">Cargos</h3>
        <HeaderRow
          headers={[
            "# Cargo",
            "# Membresía",
            "Paquete",
            "Total",
            "Estado",
            "Fecha",
            "Forma de Pago",
          ]}
        />
        {renderInvoices()}
      </div>
      <div className="card no-scale my-3">
        <div className="row border-bottom pb-2 mb-2">
          <div className="col-12 col-md-6">
            <h3>Circuitos</h3>
          </div>
          <div className="col-12 col-md-6 text-right">
            <button className="btn btn-accent">+ Circuito</button>
          </div>
        </div>
        <HeaderRow
          headers={[
            "# Circuito",
            "Estado",
            "Fecha de Expiración",
            "Fecha Agendada",
            "Tipo de Circuito",
            "Instructor",
            "Acciones",
          ]}
        />
        {renderCircuitos()}
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

      <button className="btn btn-outline-danger mt-5" onClick={confirmDelete}>
        <i className="fa fa-trash"></i> Eliminar Cliente
      </button>
    </div>
  );
};

export default AdminSingleUsuario;
