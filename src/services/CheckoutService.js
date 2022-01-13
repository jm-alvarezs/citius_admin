import api from "./api";

const route = "/checkout";

const CheckoutService = {
  attempt: (class_package_id, discountCode) =>
    api.post(`${route}/attempt`, { class_package_id, discountCode }),
  postCheckout: (class_package_id, customer_id, discountCode) =>
    api.post(route, { class_package_id, customer_id, discountCode }),
  postPayPal: (packageClassId, discountCode) =>
    api.post(`${route}/paypal`, { packageClassId, discountCode }),
  capturePayPal: ({ orderID }) => api.post(`${route}/capture`, { orderID }),
};

export default CheckoutService;
