import React, { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../context/CheckoutContext";
import { MetodosContext } from "../context/MetodosContext";
import { formatMonto } from "../utils";
import mastercard from "../assets/images/payment-method-mc.png";
import visa from "../assets/images/payment-method-visa.png";
import amex from "../assets/images/payment-method-amex.png";
import { Link } from "@reach/router";
import { UserContext } from "../context/UserContext";
import StripeCheckout from "../components/common/StripeCheckout";
import logo_recortado from "../assets/images/logo_blanco.png";

const Checkout = ({ class_package_id }) => {
  //Singup and Login
  const [login, setLogin] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const { spinner, user, signUp, signIn } = useContext(UserContext);

  const spinnerUsuario = useContext(UserContext).spinner;

  //Discounts
  const [codigo, setCodigo] = useState("");

  //Payments
  const { metodos } = useContext(MetodosContext);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  //Checkout
  const { descuento, spinnerDescuento, paquete, getPaquete, validarDescuento } =
    useContext(CheckoutContext);

  useEffect(() => {
    getPaquete(class_package_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitDescuento = (e) => {
    e.preventDefault();
    validarDescuento(codigo);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    signIn(correo, password);
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    signUp(nombre, correo, password, telefono);
  };

  const renderCreateAccount = () => {
    if (user === null) {
      if (login) {
        return (
          <div className="container-fluid px-0 mt-3 mb-4">
            <h2>Inicia Sesión</h2>
            <form className="card no-scale" onSubmit={handleSubmitLogin}>
              <label>Correo</label>
              <input
                type="email"
                className="form-control mb-3"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="row">
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={spinner}
                  >
                    {spinner ? (
                      <div className="spinner-border"></div>
                    ) : (
                      "Entrar"
                    )}
                  </button>
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn btn-link"
                    onClick={() => setLogin(false)}
                  >
                    ¿Aun no tienes cuenta? Regístrate
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
      }
      return (
        <div className="container-fluid ps-0 mt-3 mb-4">
          <h2>Crea tu cuenta</h2>
          <form className="card no-scale" onSubmit={handleSubmitSignUp}>
            <label>Nombre</label>
            <input
              type="text"
              className="form-control mb-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label>Correo</label>
            <input
              type="email"
              className="form-control mb-3"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Teléfono</label>
            <input
              type="tel"
              className="form-control mb-3"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <div className="row">
              <div className="col-6">
                <button type="submit" className="btn btn-dark">
                  {spinnerUsuario ? (
                    <div className="spinner-border"></div>
                  ) : (
                    "Crear cuenta"
                  )}
                </button>
              </div>
              <div className="col-6 text-end">
                <button className="btn btn-link" onClick={() => setLogin(true)}>
                  ¿Ya tienes cuenta? Inicia Sesión
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  };

  const renderPaquete = () => {
    if (paquete && paquete !== null) {
      const price =
        paquete.sale_price !== null ? paquete.sale_price : paquete.price;
      return (
        <div className="my-3">
          <h3>{paquete.title}</h3>
          <h4>{paquete.name}</h4>
          <p>{paquete.description}</p>
          <h5>
            Total: {"$"}
            {formatMonto(price)}
            {" MXN"}
          </h5>
        </div>
      );
    }
  };

  const renderDescuento = () => {
    if (user !== null) {
      return (
        <form onSubmit={handleSubmitDescuento}>
          <div className="container-fluid py-4 px-0">
            <label className="bold">Código de Descuento</label>
            <input
              type="text"
              className="form-control w-50 mb-3"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-dark"
              disabled={spinnerDescuento}
            >
              {spinnerDescuento ? (
                <div className="spinner-border"></div>
              ) : (
                "Aplicar"
              )}
            </button>
          </div>
        </form>
      );
    }
  };

  const renderResultadoDescuento = () => {
    if (descuento && descuento !== null) {
      let total = paquete.price;
      if (descuento.is_percent) {
        let porcentaje = parseFloat(1 - descuento.amount / 100);
        total = parseFloat(paquete.price) * porcentaje;
      } else {
        total = paquete.price - descuento.amount;
      }
      total = parseFloat(total).toFixed(2);
      return (
        <div className="container-fluid px-0">
          <h5>
            Total con Descuento: {"$"}
            {total} MXN
          </h5>
        </div>
      );
    }
  };

  const renderMetodosPago = () => {
    if (metodos && metodos !== null) {
      return metodos.map((metodo) => (
        <div
          key={metodo.conekta_payment_source_id}
          className="card p-3 no-scale my-3"
        >
          <div className="row mx-0">
            <div className="col-1">
              <input
                type="radio"
                checked={paymentMethod === metodo}
                onChange={() => setPaymentMethod(metodo)}
              />
            </div>
            <div className="col-11">
              <div className="row align-items-center">
                <div className="col col-md-4">
                  <img
                    src={
                      metodo.card_type === "mastercard"
                        ? mastercard
                        : metodo.card_type === "visa"
                        ? visa
                        : amex
                    }
                    className="card-type"
                    alt="card type"
                  />
                </div>
                <div className="col col-md-4 capitalize">
                  {metodo.card_type}
                </div>
                <div className="col col-md-4">
                  {"**** "}
                  {metodo.last_digits}
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  };

  const renderPago = () => {
    if (user !== null) {
      return (
        <>
          <h2>Forma de Pago</h2>
          <div className="card no-scale my-3">
            <StripeCheckout
              element_id={class_package_id}
              discountCode={codigo}
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pb-3 bg-dark pt-3">
        <div className="container-fluid mb-2 pb-2 border-bottom ">
          <div className="row align-items-center">
            <div className="col-8 col-md-10">
              <h1 className="text-white">Checkout</h1>
            </div>
            <div className="col-4 col-md-2">
              <Link to="/">
                <img src={logo_recortado} className="mw-100 w-100" alt="logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row bg-light pt-4 pb-5 h-80">
        <div className="col-12 col-md-4 my-2">
          {renderPaquete()}
          {renderResultadoDescuento()}
          {renderDescuento()}
        </div>
        <div className="col-12 col-md-8 my-2">
          {renderCreateAccount()}
          {renderPago()}
        </div>
      </div>
      <div className="row bg-dark text-white py-2">
        <div className="container-fluid">
          <div className="col col-md-6">
            <Link to="/privacidad" className="text-white">
              Aviso de Privacidad
            </Link>
          </div>
          <div className="col col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
