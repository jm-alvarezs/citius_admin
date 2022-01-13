import React, { createContext, useReducer } from "react";
import VideoTypeReducer from "../reducers/VideoTypeReducer";
import VideoTypeService from "../services/VideoTypeService";
import { VIDEO_TYPE_RECIBIDOS } from "../types";

const initialState = {
  video_types: null,
  video_type: null,
};

export const VideoTypeContext = createContext(initialState);

export const VideoTypeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoTypeReducer, initialState);

  const getVideoTypes = () => {
    VideoTypeService.getVideoTypes().then((res) => {
      const { video_types } = res.data;
      dispatch({ type: VIDEO_TYPE_RECIBIDOS, payload: video_types });
    });
  };

  return (
    <VideoTypeContext.Provider value={{ ...state, getVideoTypes }}>
      {children}
    </VideoTypeContext.Provider>
  );
};
