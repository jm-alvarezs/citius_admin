import React, { useContext, useEffect } from "react";
import DescuentoCard from "../../components/descuentos/DescuentoCard";
import DescuentoForm from "../../components/descuentos/DescuentoForm";
import { DiscountsContext } from "../../context/DiscountsContext";
import { ModalContext } from "../../context/ModalContext";

const AdminDescuentos = () => {
  const { descuentos, getDescuentosAdmin, deleteDescuento } =
    useContext(DiscountsContext);
  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    getDescuentosAdmin();
  }, []);

  const createDescuento = () => {
    modalComponent("Agregar Descuento", <DescuentoForm discount_id="nuevo" />);
  };

  const editarDescuento = (discount_id) => {
    modalComponent(
      "Editar Descuento",
      <DescuentoForm discount_id={discount_id} />
    );
  };

  const confirmDelete = (descuento) => {
    modalComponent(
      "Eliminar Descuento",
      <div>
        <p>
          ¿Estás segura que quieres eliminar el descuento {descuento.title} -{" "}
          {descuento.code}? Esta acción NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteDescuento(descuento.discount_id)}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    );
  };

  const renderDescuentos = () => {
    if (descuentos && descuentos !== null) {
      if (descuentos.length === 0) return <p>No hay descuentos disponibles.</p>;
      return descuentos.map((descuento) => (
        <DescuentoCard
          key={descuento.discount_id}
          descuento={descuento}
          confirmDelete={confirmDelete}
          editarDescuento={editarDescuento}
        />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3 align-items-center">
        <div className="col-6">
          <h1>Descuentos</h1>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-accent" onClick={createDescuento}>
            + Agregar
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row bold py-2 bg-light border">
          <div className="col">Código</div>
          <div className="col">Cantidad</div>
          <div className="col">Fecha de Expiración</div>
          <div className="col">Acciones</div>
        </div>
        {renderDescuentos()}
      </div>
    </div>
  );
};

export default AdminDescuentos;
