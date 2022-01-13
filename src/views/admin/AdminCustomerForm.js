import React from "react";
import CustomerForm from "../../components/customers/CustomerForm";
import PanelTitle from "../../components/global/PanelTitle";

const AdminCustomerForm = ({ customer_id }) => {
  return (
    <div className="container-fluid">
      <PanelTitle
        title={`${isNaN(customer_id) ? "Agregar" : "Editar"} Cliente`}
      />
      <div className="card no-scale">
        <CustomerForm customer_id={customer_id} />
      </div>
    </div>
  );
};

export default AdminCustomerForm;
