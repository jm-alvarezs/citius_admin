import api from "./api";

const route = "/tags";

export default {
  getTags: () => api.get(route),
};
