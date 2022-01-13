import { getArgs } from "../utils";
import api from "./api";

const route = "/purchases";

const PurchasesService = {
  getPurchases: (start_date, end_date, filters) =>
    api.get(
      `${route}/admin/all?start_date=${start_date}&end_date=${end_date}&${getArgs(
        filters
      )}`
    ),
  getPurchase: (purchase_id) => api.get(`${route}/${purchase_id}`),
};

export default PurchasesService;
