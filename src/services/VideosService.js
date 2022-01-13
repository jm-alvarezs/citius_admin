import { getArgs } from "../utils";
import api from "./api";

const route = "/videos";

export default {
  getVideos: (type, page, { query, coach, tipo }) =>
    api.get(
      `${route}?type=${type}&page=${page}&query=${query}&coach=${coach}&tipo=${tipo}`
    ),
  getAllVideos: (page, filters) =>
    api.get(`${route}/admin/all?page=${page}&${getArgs(filters)}`),
  getFavoritos: (query) => api.get(`/favoritos?${getArgs(query).slice(1)}`),
  getSingleVideo: (video_id) => api.get(`${route}/${video_id}`),
  postFavorito: (video_id) => api.post("/favoritos", { video_id }),
  postVideo: (video) => api.post(route, { ...video }),
  putVideo: (video) => api.put(route, { ...video }),
  deleteFavorito: (video_id) => api.delete(`/favoritos/${video_id}`),
  deleteVideo: (video_id) => api.delete(`${route}/${video_id}`),
};
