import { SHOW_SUCCESS, SHOW_ALERT, CLEAR_ALERT, CLEAR_SUCCESS } from "../types";
import moment from "moment";

moment.locale("es", {
  monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
  weekdaysShort: "Lun_Mar_Mie_Jue_Vie_Sab_Dom".split("_"),
});

const stripe_dev_key =
  "pk_test_51JZfCFF3kBOsZo4c4XEj9eGlSpNNVDFLnNsikAQJfBhNLo8lFMOaqBRUcs04grQmaHFM2tDNvFg9rE9Je90ov4jR00aGbnirCo";

const stripe_live_key =
  "pk_live_51J3W4hGoE9eJxTiKeBw9uf8VZLZuhL2OdOXSgpvCfbfGe1dyM7thsayFZHvuT7c6QebIZqlP8N2V985NPYhp5od6000zymfRfe";

export const STRIPE_KEY = stripe_dev_key;

export const displaySuccess = (dispatch, message) => {
  dispatch({ type: SHOW_SUCCESS, payload: message });
  setTimeout(() => {
    dispatch({ type: CLEAR_SUCCESS });
  });
};

export const displayError = (dispatch, error) => {
  if (typeof error === "object") {
    error = error.toString();
  }
  dispatch({ type: SHOW_ALERT, payload: error });
  setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000);
};

export const BASE_URL =
  (process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://thebodymethod.mx") + "/api";

export const S3_ENDPOINT = "https://thebodymethod.sfo3.digitaloceanspaces.com";

export const durations = [
  "10 a 19 minutos",
  "20 a 29 minutos",
  "30 a 39 minutos",
  "40 a 49 minutos",
  "50 a 59 minutos",
  "1 hora o mas",
];

export const searchRows = (query, rows) => {
  if (!rows) return;
  if (isNaN(query)) query = query.toLowerCase();
  let searchResult = rows.filter((row) => {
    let result = Object.keys(row).filter((column) => {
      if (Array.isArray(row[column])) {
        return row[column].filter((subcolumn) => {
          if (isNaN(subcolumn)) {
            if (subcolumn.toLowerCase().includes(query)) return row;
          } else if (subcolumn === query) return row;
          return null;
        });
      }
      if (isNaN(row[column])) {
        if (String(row[column]).toLowerCase().includes(query)) {
          return row;
        }
      } else if (String(row[column]) === query) {
        return row;
      } else if (Number(row[column]) === Number(query)) {
        return row;
      }
      return null;
    });
    return result.length > 0;
  });
  return searchResult;
};

export const getArgs = (args) => {
  if (args && args !== null) {
    const array = Object.keys(args)
      .map((key) => {
        if (args[key] && args[key] !== null && args[key] !== "") {
          return `${key}=${args[key]}`;
        }
        return null;
      })
      .filter((arg) => arg !== null);
    if (array.length > 0) {
      return `${array.join("&")}`;
    }
  }
  return "";
};

export const calcularTotal = (productos) => {
  if (productos && productos !== null) {
    let total = 0;
    productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  }
  return 0;
};

export function formatMonto(monto) {
  monto = parseFloat(monto);
  if (!monto || monto === null || isNaN(monto)) monto = 0;
  return numberWithCommas(monto);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const hideModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  }
};

export const showModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  } else {
    const newButton = document.createElement("button");
    newButton.attributes.href = "#modal";
    newButton.id = "main-button";
    newButton.setAttribute("data-toggle", "modal");
    newButton.setAttribute("data-target", "#modal");
    newButton.setAttribute("data-bs-toggle", "modal");
    newButton.setAttribute("data-bs-target", "#modal");
    newButton.style.visibility = "hidden";
    document.body.appendChild(newButton);
    newButton.click();
  }
};

export const menuitems = [
  {
    name: "Calendario",
    handle: "/myadmin",
  },
  {
    name: "Reservaciones",
    handle: "/myadmin/reservaciones",
  },
  {
    name: "Paquetes",
    handle: "/myadmin/shop",
  },
];

export const cuenta = [
  {
    name: "Mi Información",
    handle: "/myadmin/informacion",
  },
  {
    name: "Mis Compras",
    handle: "/myadmin/pagos",
  },
];

export const adminitems = [
  {
    name: "Clases",
    handle: "/myadmin/asistentes",
  },
  {
    name: "Clientes",
    handle: "/myadmin/clientes",
  },
];

export const coachitems = [
  {
    name: "Clases",
    handle: "/myadmin/asistentes",
  },
];

export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getCardType = (number) =>
  String(number) === "3"
    ? "amex"
    : String(number) === "4"
    ? "visa"
    : "mastercard";

export const categories = {
  dance: [11, 12, 13, 15],
  workout: [14, 15],
  presenciales: [11742, 11743, 11744, 11745],
};

export const getCompradasPresenciales = (paquetes) => {
  const package_ids = categories.presenciales;
  const customer_classes = paquetes.filter((class_category) =>
    package_ids.includes(class_category.package_class_id)
  );
  let total = 0;
  customer_classes.forEach((purchase) => {
    total += purchase.available_class;
  });
  return total;
};

export const getPresencialesVigentes = (paquetes) => {
  const package_ids = categories.presenciales;
  const customer_classes = paquetes.filter(
    (class_category) =>
      package_ids.includes(class_category.package_class_id) &&
      moment(class_category.created_at)
        .add(class_category.package_days, "days")
        .isAfter(moment())
  );
  let total = 0;
  customer_classes.forEach((purchase) => {
    total += purchase.available_class;
  });
  return total;
};

export const getVigencia = (handle, user) => {
  const paquete = user.vigencias.find(
    (class_category) => class_category.handle === handle
  );
  if (paquete) {
    return paquete.expiration;
  }
};

export const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const mapas = {
  1: [4, 6],
  2: [2, 4, 4],
};

export const iconosMapas = {
  1: "fas fa-bicycle",
  2: "fas fa-praying-hands",
};

export const paymentMethods = [
  {
    name: "Tarjeta de Crédito Online",
    value: 1,
  },
  {
    name: "Transferencia electrónica",
    value: 2,
  },
  {
    name: "PayPal",
    value: 3,
  },
  {
    name: "Efectivo",
    value: 4,
  },
  {
    name: "Terminal PDV",
    value: 6,
  },
  {
    name: "Otros métodos de pago",
    value: 5,
  },
];
