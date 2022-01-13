import { navigate } from "@reach/router";
import React, { createContext, useContext, useReducer } from "react";
import VideosReducer from "../reducers/VideosReducer";
import AdjuntosService from "../services/AdjuntosService";
import ProgramsService from "../services/ProgramsService";
import TagsService from "../services/TagsService";
import VideosService from "../services/VideosService";
import {
  VIDEOS_RECIBIDOS,
  SINGLE_VIDEO_RECIBIDO,
  AGREGAR_FAVORITO,
  ELIMINAR_FAVORITO,
  SET_PROPIEDAD_VIDEO,
  CREATE_VIDEO,
  PURCHASE_NEEDED,
  SHOW_SPINNER,
  HIDE_SPINNER,
  FAVORITOS_RECIBIDOS,
  TAGS_RECIBIDOS,
  PROGRAMS_RECIBIDOS,
} from "../types";
import { hideModal } from "../utils";
import { ModalContext } from "./ModalContext";

const initialState = {
  favoritos: null,
  programs: null,
  videos: null,
  video: null,
};

const getArray = (length, type) => {
  const arr = [];
  const title = type[0].toUpperCase() + type.substring(1);
  for (let i = 0; i < length; i++) {
    arr.push({
      title,
    });
  }
  return arr;
};

export const VideosContext = createContext(initialState);

export const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);

  const { alert, success } = useContext(ModalContext);

  const getTags = () => {
    TagsService.getTags().then((res) => {
      const { tags } = res.data;
      dispatch({ type: TAGS_RECIBIDOS, payload: tags });
    });
  };
  const getPrograms = () => {
    ProgramsService.getPrograms().then((res) => {
      const { programs } = res.data;
      dispatch({ type: PROGRAMS_RECIBIDOS, payload: programs });
    });
  };

  const getVideos = (filters) => {
    VideosService.getVideos(filters)
      .then((res) => {
        const { videos } = res.data;
        dispatch({ type: VIDEOS_RECIBIDOS, payload: videos });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            dispatch({ type: PURCHASE_NEEDED });
          }
        }
      });
  };

  const getVideosByProgram = (url, filters) => {
    VideosService.getVideosByProgram(url, filters)
      .then((res) => {
        const { videos } = res.data;
        dispatch({ type: VIDEOS_RECIBIDOS, payload: videos });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            dispatch({ type: PURCHASE_NEEDED });
          }
        }
      });
  };

  const getVideosByTag = (tag_id, filters) => {
    VideosService.getVideosByTag(tag_id, filters)
      .then((res) => {
        const { videos } = res.data;
        dispatch({ type: VIDEOS_RECIBIDOS, payload: videos });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 412) {
            dispatch({ type: PURCHASE_NEEDED });
          }
        }
      });
  };

  const getFavoritos = (filters) => {
    VideosService.getFavoritos(filters).then((res) => {
      const { favorites } = res.data;
      dispatch({ type: FAVORITOS_RECIBIDOS, payload: favorites });
    });
  };

  const clearFavoritos = () => {
    dispatch({ type: FAVORITOS_RECIBIDOS, payload: null });
  };

  const getAllVideos = (page, filters) => {
    VideosService.getAllVideos(page, filters).then((res) => {
      const { videos } = res.data;
      dispatch({ type: VIDEOS_RECIBIDOS, payload: videos });
    });
  };

  const getSingleVideo = (video_id) => {
    VideosService.getSingleVideo(video_id)
      .then((res) => {
        const { video } = res.data;
        dispatch({ type: SINGLE_VIDEO_RECIBIDO, payload: video });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            alert("Lo sentimos, no hemos encontrado este video.");
          }
        }
      });
  };

  const agregarFavorito = (video_id) => {
    VideosService.postFavorito(video_id).then(() => {
      dispatch({ type: AGREGAR_FAVORITO, payload: video_id });
      success("¡Favorito agregado!");
    });
  };

  const eliminarFavorito = (video_id) => {
    VideosService.deleteFavorito(video_id).then(() => {
      dispatch({ type: ELIMINAR_FAVORITO, payload: video_id });
      success("¡Favorito eliminado!");
    });
  };

  const deleteVideo = (video_id) => {
    VideosService.deleteVideo(video_id).then(() => {
      navigate("/myadmin/videos");
      success("¡Video eliminado con éxito!");
      hideModal();
      getAllVideos();
    });
  };

  const setPropiedadVideo = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_VIDEO, payload: { key, value } });
  };

  const clearVideos = () => {
    dispatch({ type: VIDEOS_RECIBIDOS, payload: null });
  };

  const createVideo = () => {
    dispatch({ type: CREATE_VIDEO });
  };

  const postVideo = (video) => {
    const callback = () => {
      dispatch({ type: HIDE_SPINNER });
      navigate("/myadmin/videos");
      success("Video guardado con éxito");
    };
    const handleError = () => {
      dispatch({ type: HIDE_SPINNER });
      alert("Hubo un error al subir el video. Vuelve a intentarlo.");
    };
    if (video.picture && video.picture !== null) {
      const formData = new FormData();
      formData.append("file", video.picture);
      dispatch({ type: SHOW_SPINNER });
      AdjuntosService.postAdjunto(formData)
        .then((res) => {
          const { file_id } = res.data;
          video.thumbnail = file_id;
          if (isNaN(video.video_id)) {
            VideosService.postVideo(video).then(callback).catch(handleError);
          } else {
            VideosService.putVideo(video).then(callback).catch(handleError);
          }
        })
        .catch((error) => {
          dispatch({ type: HIDE_SPINNER });
        });
    } else {
      dispatch({ type: SHOW_SPINNER });
      if (isNaN(video.video_id)) {
        VideosService.postVideo(video).then(callback).catch(handleError);
      } else {
        VideosService.putVideo(video).then(callback).catch(handleError);
      }
    }
  };

  return (
    <VideosContext.Provider
      value={{
        ...state,
        getTags,
        postVideo,
        getVideos,
        getPrograms,
        createVideo,
        clearVideos,
        deleteVideo,
        getAllVideos,
        getFavoritos,
        getVideosByTag,
        clearFavoritos,
        getSingleVideo,
        agregarFavorito,
        eliminarFavorito,
        setPropiedadVideo,
        getVideosByProgram,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
