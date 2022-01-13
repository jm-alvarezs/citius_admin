import React, { useContext, useEffect } from "react";
import MapaLugares from "../../components/clases/MapaLugares";
import { ClassTypeContext } from "../../context/ClassTypesContext";

const AdminClassTypeForm = ({ class_type_id }) => {
  const {
    class_type,
    getClassType,
    createClassType,
    setPropiedadClassType,
    postClassType,
  } = useContext(ClassTypeContext);

  useEffect(() => {
    if (isNaN(class_type_id)) {
      createClassType();
    } else {
      getClassType(class_type_id);
    }
  }, [class_type_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postClassType(class_type);
  };

  const renderForm = () => {
    if (class_type && class_type !== null) {
      const { name, description, icon, color, mapa } = class_type;
      let lugares = String(mapa)
        .split(",")
        .map((num) => parseInt(num))
        .filter((num) => !isNaN(num));
      return (
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setPropiedadClassType("name", e.target.value)}
          />
          <label>Descripción</label>
          <input
            type="text"
            className="form-control mb-3"
            value={description}
            onChange={(e) =>
              setPropiedadClassType("description", e.target.value)
            }
          />
          <label>Icono</label>
          <input
            type="text"
            className="form-control mb-3"
            value={icon}
            onChange={(e) => setPropiedadClassType("icon", e.target.value)}
          />
          <label>Color</label>
          <input
            type="color"
            className="form-control mb-3"
            value={color}
            onChange={(e) => setPropiedadClassType("color", e.target.value)}
          />
          {/*<label>Lugares</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Número de columnas por fila, separado por comas"
            value={mapa}
            onChange={(e) => setPropiedadClassType("mapa", e.target.value)}
          />*/}
          {lugares.length > 0 && <MapaLugares rows={lugares} icon={icon} />}
          <button type="submit" className="btn btn-dark w-100 mt-3">
            Guardar
          </button>
        </form>
      );
    }
  };

  return <div className="container-fluid px-0">{renderForm()}</div>;
};

export default AdminClassTypeForm;
