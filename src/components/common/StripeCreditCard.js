import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { cardStyle } from "../../utils";
import CheckoutService from "../../services/CheckoutService";
import { ModalContext } from "../../context/ModalContext";
import { navigate } from "@reach/router";

const StripeCreditCard = ({ element_id, discountCode }) => {
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { alert, success } = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    CheckoutService.attempt(element_id, discountCode)
      .then(async (res) => {
        const { clientSecret, purchase_id } = res.data;
        const card = elements.getElement(CardElement);
        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
          },
        });
        if (payload.error) {
          setProcessing(false);
          alert(
            `Hubo un error al procesar tu compra: ${payload.error.message}`
          );
        } else {
          setProcessing(false);
          success("¡Compra exitosa!");
          navigate(`/gracias/${purchase_id}`);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            setProcessing(false);
            return alert("Lo sentimos. Este evento especial se ha llenado.");
          } else if (error.response.status === 409) {
            setProcessing(false);
            return alert(
              "Lo sentimos. Has alcanzado el límite de compras de este paquete."
            );
          }
        }
      });
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
  };

  return (
    <div className="container-fluid px-0">
      <form onSubmit={handleSubmit}>
        <h5 className="border-bottom pb-2 mb-3">Tarjeta de Crédito</h5>
        <CardElement
          id="card-element"
          options={cardStyle}
          className="form-control pt-2 my-2"
          onChange={handleChange}
        />
        <button
          className="btn btn-success btn-checkout bold"
          disabled={processing || disabled}
        >
          {processing ? <div className="spinner-border"></div> : "Pagar Ahora"}
        </button>
      </form>
    </div>
  );
};

export default StripeCreditCard;
