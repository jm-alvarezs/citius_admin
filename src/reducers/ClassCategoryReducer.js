import {
  CLASS_CATEGORIES_RECIBIDAS,
  CLASS_CATEGORY_RECIBIDA,
  CREATE_CATEGORY,
  SET_PROPIEDAD_CATEGORY,
} from "../types";

const schema = {
  class_category_id: "nueva",
  name: "",
  handle: "",
  description: "",
  available: true,
};

const ClassCategoryReducer = (state, { type, payload }) => {
  switch (type) {
    case CLASS_CATEGORIES_RECIBIDAS: {
      return { ...state, class_categories: payload };
    }
    case CLASS_CATEGORY_RECIBIDA:
      return { ...state, class_category: payload };
    case CREATE_CATEGORY:
      return { ...state, class_category: schema };
    case SET_PROPIEDAD_CATEGORY:
      const { key, value } = payload;
      const class_category = { ...state.class_category };
      class_category[key] = value;
      return { ...state, class_category };
    default:
      return { ...state };
  }
};

export default ClassCategoryReducer;
