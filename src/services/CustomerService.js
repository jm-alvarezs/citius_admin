import { getArgs } from "../utils";
import api from "./api";

const route = "/customer";

const CustomerService = {
  getCustomer: (customer_id) => api.get(`${route}/admin/${customer_id}`),
  getAllCustomers: (filters) =>
    api.get(`${route}/admin/all?${getArgs(filters)}`),
  getCustomersByQuery: (query) => api.get(`${route}/query?query=${query}`),
  postCustomer: (customer) => api.post(route, { ...customer }),
  putCustomer: (customer) => api.put(route, { ...customer }),
  putCurrentCustomer: (customer) => api.put(route, { ...customer }),
  extenderAcceso: (
    customer_id,
    class_package_id,
    expiration_days,
    is_gift,
    total,
    payment_method_id
  ) =>
    api.post(`${route}/giveAccess`, {
      customer_id,
      class_package_id,
      expiration_days,
      is_gift,
      total,
      payment_method_id,
    }),
  giveClasses: (customer_id, amount, expiration_days) =>
    api.put(`${route}/giveClasses`, {
      customer_id,
      amount,
      expiration_days,
    }),
  revokeAccess: (purchase_id) =>
    api.put(`${route}/revokeAccess`, { purchase_id }),
  removeClasses: (customer_id, amount) =>
    api.put(`${route}/removeClasses`, { customer_id, amount }),
  addCircuit: (circuit) => api.post(`${route}/circuit`, { ...circuit }),
  redeemCircuit: (circuit) => api.post(`${route}/redeem`, { ...circuit }),
  recoverPassword: (email) => api.post(`${route}/recover`, { email }),
  getPasswordResetLink: (email) =>
    api.post(`${route}/resetPasswordLink`, { email }),
};

export default CustomerService;
