import {
  CREATE_CUSTOMER,
  CUSTOMERS_RECIBIDOS,
  LINK_RECIBIDO,
  SET_CUSTOMER,
  SET_PROPIEDAD_CUSTOMER,
} from "../types";

const schema = {
  customer_id: "nuevo",
  name: "",
  last_name: "",
  email: "",
  phone: "",
  instagram: "",
  signup_reason: "",
};

const CustomerReducer = (state, { type, payload }) => {
  switch (type) {
    case CUSTOMERS_RECIBIDOS: {
      return { ...state, customers: payload };
    }
    case SET_CUSTOMER: {
      return { ...state, customer: payload };
    }
    case CREATE_CUSTOMER:
      return { ...state, customer: schema };
    case SET_PROPIEDAD_CUSTOMER:
      const customer = { ...state.customer };
      const { key, value } = payload;
      customer[key] = value;
      return { ...state, customer };
    case LINK_RECIBIDO: {
      return { ...state, link: payload };
    }
    default:
      return { ...state };
  }
};

export default CustomerReducer;
