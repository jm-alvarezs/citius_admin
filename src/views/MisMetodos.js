import React, { useContext, useEffect } from "react";
import { MetodosContext } from "../context/MetodosContext";
import MetodoCard from "../components/metodos/MetodoCard";
import { ModalContext } from "../context/ModalContext";
import { hideModal } from "../utils";
import FormCreditCard from "../components/common/InputCreditCard";

const MisMetodos = () => {
  const { modalComponent } = useContext(ModalContext);
  const { metodos, getMetodos, postMetodoPago, deleteMetodoPago } =
    useContext(MetodosContext);

  useEffect(() => {
    getMetodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteMetodo = (metodo) => {
    modalComponent(
      "Eliminar Método de Pago",
      <div className="container-fluid">
        <p>
          ¿Estás seguro que quieres eliminar el método de pago ****{" "}
          {metodo.last_digits}?
        </p>
        <p>Esta acción NO puede deshacerse</p>
        <div className="row">
          <div className="col col-md-6">
            <button
              className="btn btn-primary"
              onClick={() => deleteMetodoPago(metodo.conekta_payment_source_id)}
            >
              Eliminar
            </button>
          </div>
          <div className="col col-md-6 text-end">
            <button className="btn btn-link text-secondary" onClick={hideModal}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMetodosPago = () => {
    if (metodos && metodos !== null) {
      if (metodos.length === 0) {
        return <p>No hay metodos de pago registrados</p>;
      }
      return metodos.map((metodo) => (
        <MetodoCard
          key={metodo.conekta_payment_source_id}
          metodo={metodo}
          deleteMetodo={deleteMetodo}
        />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  const agregarMetodo = () => {
    modalComponent(
      "Agregar Método de Pago",
      <FormCreditCard saveCard modifier={postMetodoPago} />
    );
  };

  return (
    <div className="container-fluid">
      <div className="mx-0 row align-items-center pb-3 mb-3 border-bottom">
        <div className="col col-md-8 ps-0">
          <h2>Mis Método de Pago</h2>
        </div>
        <div className="col col-md-4 pe-0 text-end">
          <button className="btn btn-dark" onClick={agregarMetodo}>
            + Agregar
          </button>
        </div>
      </div>
      {renderMetodosPago()}
    </div>
  );
};

export default MisMetodos;
