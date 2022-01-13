import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_KEY } from "../../utils";
import StripeCreditCard from "./StripeCreditCard";

const promise = loadStripe(STRIPE_KEY);

const StripeCheckout = ({ element_id, discountCode }) => {
  return (
    <div className="container-fluid position-relative h-100 px-0">
      <Elements stripe={promise}>
        <StripeCreditCard element_id={element_id} discountCode={discountCode} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
