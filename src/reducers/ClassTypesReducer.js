import {
  CLASS_TYPES_RECIBIDOS,
  CREATE_CLASS_TYPE,
  SET_CLASS_TYPE,
  SET_PROPIEDAD_CLASS_TYPE,
} from "../types";

const schema = {
  class_type_id: "nueva",
  name: "",
  description: "",
  color: "",
  icon: "",
};

const ClassTypesReducer = (state, { type, payload }) => {
  switch (type) {
    case CLASS_TYPES_RECIBIDOS:
      return { ...state, class_types: payload };
    case SET_CLASS_TYPE:
      return { ...state, class_type: payload };
    case CREATE_CLASS_TYPE:
      return { ...state, class_type: schema };
    case SET_PROPIEDAD_CLASS_TYPE:
      const class_type = { ...state.class_type };
      const { key, value } = payload;
      class_type[key] = value;
      return { ...state, class_type };
    default:
      return { ...state };
  }
};

export default ClassTypesReducer;
