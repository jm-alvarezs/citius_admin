import { VIDEO_TYPE_RECIBIDOS } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case VIDEO_TYPE_RECIBIDOS: {
      return { ...state, video_types: payload };
    }
    default:
      return { ...state };
  }
};
