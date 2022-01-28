import { navigate } from "@reach/router";
import React, { createContext, useReducer, useContext } from "react";
import CustomerReducer from "../reducers/CustomerReducer";
import CustomerService from "../services/CustomerService";
import {
  SET_CUSTOMER,
  CREATE_CUSTOMER,
  CUSTOMERS_RECIBIDOS,
  SET_PROPIEDAD_CUSTOMER,
  SHOW_SPINNER,
  HIDE_SPINNER,
} from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  customers: null,
  customer: null,
};

export const CustomerContext = createContext(initialState);

export const CustomerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  const { success, alert } = useContext(ModalContext);

  const getCustomersByQuery = (query) => {
    CustomerService.getCustomersByQuery(query).then((res) => {
      const { customers } = res.data;
      dispatch({ type: CUSTOMERS_RECIBIDOS, payload: customers });
    });
  };

  const getAllCustomers = (filters) => {
    dispatch({ type: CUSTOMERS_RECIBIDOS, payload: null });
    CustomerService.getAllCustomers(filters).then((res) => {
      const { customers } = res.data;
      dispatch({ type: CUSTOMERS_RECIBIDOS, payload: customers });
    });
  };

  const getCustomer = (customer_id) => {
    CustomerService.getCustomer(customer_id).then((res) => {
      const { customer } = res.data;
      dispatch({ type: SET_CUSTOMER, payload: customer });
    });
  };

  const extenderAcceso = (
    customer_id,
    class_package_id,
    expiration_days,
    is_gift,
    payment_method_id
  ) => {
    CustomerService.extenderAcceso(
      customer_id,
      class_package_id,
      expiration_days,
      is_gift,
      payment_method_id
    ).then(() => {
      success("¡Acceso agregado!");
      getCustomer(customer_id);
      hideModal();
    });
  };

  const revokeAccess = (purchase_id, customer_id) => {
    CustomerService.revokeAccess(purchase_id).then((res) => {
      getCustomer(customer_id);
      success("¡Acceso eliminado!");
      hideModal();
    });
  };

  const removeClasses = (customer_id, amount) => {
    CustomerService.removeClasses(customer_id, amount).then(() => {
      getCustomer(customer_id);
      success("¡Clases Restadas!");
      hideModal();
    });
  };

  const clearCustomer = () => {
    dispatch({ type: SET_CUSTOMER, payload: null });
  };

  const setPropiedadCustomer = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_CUSTOMER, payload: { key, value } });
  };

  const createCustomer = () => {
    dispatch({ type: CREATE_CUSTOMER });
  };

  const postCustomer = (customer) => {
    dispatch({ type: SHOW_SPINNER });

    const handleSuccess = ({ data }) => {
      success("Cliente guardado con éxito.");
      dispatch({ type: HIDE_SPINNER });
      navigate(`/myadmin/customer/${data.customer.customer_id}`);
    };

    const handleError = (error) => {
      alert(error);
      dispatch({ type: HIDE_SPINNER });
    };

    if (isNaN(customer.customer_id)) {
      CustomerService.postCustomer(customer)
        .then(handleSuccess)
        .catch(handleError);
    } else {
      CustomerService.putCustomer(customer)
        .then(handleSuccess)
        .catch(handleError);
    }
  };

  const redeemCircuit = (
    customer_id,
    available_circuit_id,
    date,
    circuit_id,
    instructor_id
  ) => {
    CustomerService.redeemCircuit({
      available_circuit_id,
      circuit_id,
      date,
      instructor_id,
    }).then(() => {
      hideModal();
      getCustomer(customer_id);
      success("Circuito agendado con éxito");
    });
  };

  return (
    <CustomerContext.Provider
      value={{
        ...state,
        getCustomer,
        getAllCustomers,
        getCustomersByQuery,
        extenderAcceso,
        clearCustomer,
        revokeAccess,
        removeClasses,
        createCustomer,
        postCustomer,
        setPropiedadCustomer,
        redeemCircuit,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
