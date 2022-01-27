import React, { useContext, useEffect } from "react";
import VideoForm from "../../components/videos/VideoForm";
import { ClassCategoryContext } from "../../context/ClassCategoryContext";
import { ClassTypeContext } from "../../context/ClassTypesContext";
import { CoachesContext } from "../../context/CoachesContext";
import { ModalContext } from "../../context/ModalContext";
import { ProgramsContext } from "../../context/ProgramsContext";
import { VideosContext } from "../../context/VideosContext";
import { VideoTypeContext } from "../../context/VideoTypeContext";

const AdminVideoForm = ({ video_id }) => {
  const {
    tags,
    video,
    spinner,
    postVideo,
    createVideo,
    deleteVideo,
    getTags,
    getSingleVideo,
    setPropiedadVideo,
  } = useContext(VideosContext);

  const { class_types, getClassTypes } = useContext(ClassTypeContext);

  const { video_types, getVideoTypes } = useContext(VideoTypeContext);

  const { programs, getPrograms } = useContext(ProgramsContext);

  const { coaches, getCoaches } = useContext(CoachesContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    if (isNaN(video_id)) {
      createVideo();
    } else {
      getSingleVideo(video_id);
    }
    getClassTypes();
    getVideoTypes();
    getPrograms();
    getCoaches();
    getTags();
  }, []);

  const confirmDelete = () => {
    modalComponent(
      "¿Eliminar Video?",
      <div className="container-fluid">
        <p>
          ¿Estás seguro que deseas eliminar el video {video.name}? Esta acción
          NO puede deshacerse.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteVideo(video.video_id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <h1>{isNaN(video_id) ? "Agregar" : "Editar"} Video</h1>
      <div className="card no-scale mb-4">
        <VideoForm
          video={video}
          modifier={setPropiedadVideo}
          postVideo={postVideo}
          class_types={class_types}
          video_types={video_types}
          instructors={coaches}
          programs={programs}
          spinner={spinner}
          tags={tags}
        />
      </div>
      <button className="btn btn-outline-danger mb-4" onClick={confirmDelete}>
        <i className="fa fa-trash"></i> Eliminar Video
      </button>
    </div>
  );
};

export default AdminVideoForm;
