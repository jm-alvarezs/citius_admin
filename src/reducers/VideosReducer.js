import {
  AGREGAR_FAVORITO,
  APPEND_VIDEOS,
  CREATE_VIDEO,
  ELIMINAR_FAVORITO,
  FAVORITOS_RECIBIDOS,
  HIDE_SPINNER,
  PROGRAMS_RECIBIDOS,
  PURCHASE_NEEDED,
  SET_PROPIEDAD_VIDEO,
  SHOW_SPINNER,
  SINGLE_VIDEO_RECIBIDO,
  TAGS_RECIBIDOS,
  VIDEOS_RECIBIDOS,
} from "../types";

const schema = {
  video_id: "nuevo",
  description: "",
  name: "",
  restricted: "",
  thumbnail: "",
  url: "",
  url_preview: "",
  instructor_id: "",
  video_type_id: "",
  video_type: "",
};

export default (state, { type, payload }) => {
  switch (type) {
    case SHOW_SPINNER: {
      return { ...state, spinner: true };
    }
    case HIDE_SPINNER: {
      return { ...state, spinner: false };
    }
    case CREATE_VIDEO: {
      return { ...state, video: schema };
    }
    case FAVORITOS_RECIBIDOS:
      return { ...state, favoritos: payload };
    case APPEND_VIDEOS: {
      let videos = state.videos;
      if (videos === null) videos = payload;
      else videos = [...videos, ...payload];
      return { ...state, videos };
    }
    case VIDEOS_RECIBIDOS: {
      return { ...state, videos: payload };
    }
    case SINGLE_VIDEO_RECIBIDO:
      return { ...state, video: payload };
    case AGREGAR_FAVORITO: {
      const videos = [...state.videos];
      const index = videos.findIndex((video) => video.video_id === payload);
      if (index !== -1) {
        videos[index].favorite = 1;
      }
      return { ...state, videos };
    }
    case ELIMINAR_FAVORITO: {
      const videos = [...state.videos];
      const index = videos.findIndex((video) => video.video_id === payload);
      if (index !== -1) {
        videos[index].favorite = 0;
      }
      return { ...state, videos };
    }
    case SET_PROPIEDAD_VIDEO: {
      const { key, value } = payload;
      const video = { ...state.video };
      video[key] = value;
      return { ...state, video };
    }
    case PURCHASE_NEEDED:
      return { ...state, purchase_needed: true };
    case TAGS_RECIBIDOS:
      return { ...state, tags: payload };
    case PROGRAMS_RECIBIDOS:
      return { ...state, programs: payload };
    default:
      return { ...state };
  }
};
