import api from "./api";

const route = "/video_types";

export default {
  getVideoTypes: () => api.get(route),
};
