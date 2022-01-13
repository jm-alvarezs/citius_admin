import React, { useEffect, useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { durations, S3_ENDPOINT } from "../../utils";
import { Link } from "@reach/router";
import moment from "moment";

const VideoForm = ({
  tags,
  video,
  programs,
  modifier,
  postVideo,
  class_types,
  video_types,
  instructors,
  spinner,
}) => {
  const [addType, setAddType] = useState(false);
  const [type, setType] = useState("");
  const [addCoach, setAddCoach] = useState(false);
  const [coach, setCoach] = useState("");
  const [changeImage, setChangeImage] = useState(false);
  const [picture, setPicture] = useState(null);

  const { alert } = useContext(ModalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...video };
    if (addCoach) {
      data.instructor_id = "nueva";
      data.instructor = {
        first_name: coach,
      };
    }
    if (addType) {
      data.video_type_id = "nuevo";
      data.video_type = {
        name: type,
      };
    }
    if (video.video_type_id === "") {
      return alert("Debes agregar un tipo de video.");
    }
    postVideo(data);
  };

  useEffect(() => {
    if (video !== null) {
      if (video.picture && video.picture !== null && picture === null) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPicture(e.target.result);
        };
        reader.readAsDataURL(video.picture);
      }
    }
  }, [video]);

  useEffect(() => {
    if (class_types !== null && video !== null) {
      if (
        video.class_type_id === "" ||
        video.class_type_id === null ||
        !video.class_type_id
      ) {
        if (class_types.length > 0) {
          modifier("class_type_id", class_types[0].class_type_id);
        }
      }
    }
  }, [class_types, video]);

  useEffect(() => {
    if (instructors !== null && video !== null) {
      if (
        video.instructor_id === "" ||
        video.instructor_id === null ||
        !video.instructor_id
      ) {
        if (instructors.length > 0) {
          modifier("instructor_id", instructors[0].instructor_id);
        }
      }
    }
  }, [instructors, video]);

  const renderinstructors = () => {
    if (instructors && instructors !== null) {
      return instructors.map((instructor) => (
        <option key={instructor.instructor_id} value={instructor.instructor_id}>
          {instructor.name} {instructor.last_name}
        </option>
      ));
    }
  };

  const renderImage = () => {
    const { thumbnail, file } = video;
    if (thumbnail && thumbnail !== null) {
      if (typeof file === "object") {
        return (
          <img
            src={`${S3_ENDPOINT}/${file.name}.${file.type}`}
            className="video-form-thumbnail d-block"
          />
        );
      }
      return <img src={thumbnail} className="video-form-thumbnail d-block" />;
    }
    if (picture !== null) {
      return <img src={picture} className="video-form-thumbnail d-block" />;
    }
  };

  const renderTypeForm = () => {
    return (
      <select
        className="form-control mb-3"
        onChange={(e) => modifier("video_type_id", e.target.value)}
        value={video.video_type_id}
      >
        {renderVideoTypes()}
      </select>
    );
  };

  const renderPrograms = () => {
    if (Array.isArray(programs)) {
      return programs.map((program) => (
        <option key={program.pogram_id} value={program.program_id}>
          {program.name}
        </option>
      ));
    }
  };

  const renderProgramForm = () => {
    return (
      <select
        className="form-control mb-3"
        onChange={(e) => modifier("program_id", e.target.value)}
        value={video.program_id}
      >
        {renderPrograms()}
      </select>
    );
  };

  const renderTags = () => {
    if (Array.isArray(tags)) {
      return tags.map((tag) => (
        <option key={tag.tag_id} value={tag.tag_id}>
          {tag.name}
        </option>
      ));
    }
  };

  const renderTagForm = () => {
    return (
      <select
        className="form-control mb-3"
        onChange={(e) => modifier("tag_id", e.target.value)}
        value={video.tag_id}
      >
        {renderTags()}
      </select>
    );
  };

  const renderCoachForm = () => {
    if (addCoach) {
      return (
        <input
          type="text"
          className="form-control mb-3"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
        />
      );
    }
    return (
      <select
        className="form-control mb-3"
        onChange={(e) => modifier("instructor_id", e.target.value)}
        value={video.instructor_id}
      >
        {renderinstructors()}
      </select>
    );
  };

  const renderImageForm = () => {
    if (changeImage || isNaN(video.video_id)) {
      return (
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFiles}
        />
      );
    }
    return (
      <button
        className="btn btn-outline-secondary d-block"
        onClick={() => setChangeImage(true)}
      >
        Cambiar Imagen
      </button>
    );
  };

  const renderForm = () => {
    if (video && video !== null) {
      const { name, description, url, class_type_id, available_at } = video;
      return (
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) => modifier("name", e.target.value)}
          />
          <label>Descripcion</label>
          <input
            type="text"
            className="form-control mb-3"
            value={description}
            onChange={(e) => modifier("description", e.target.value)}
          />
          <label>URL de Video</label>
          <input
            type="text"
            className="form-control mb-3"
            value={url}
            onChange={(e) => modifier("url", e.target.value)}
          />
          <div className="row my-3">
            <div className="col-4 col-md-4"> {renderImage()}</div>
            <div className="col-8 col-md-8">
              <label>Thumbnail</label>
              {renderImageForm()}
            </div>
          </div>
          <div className="container-fluid px-0">
            <label>Tipo de Clase</label>
            <select
              className="form-control mb-3"
              onChange={(e) => {
                modifier("class_type_id", e.target.value);
              }}
              value={class_type_id}
            >
              {renderClassTypes()}
            </select>
          </div>
          <div className="container-fluid px-0">
            <label>Impacto</label>
            {renderTypeForm()}
          </div>
          <div className="container-fluid px-0">
            <label>Programa</label>
            {renderProgramForm()}
          </div>
          <div className="container-fluid px-0">
            <label>Target</label>
            {renderTagForm()}
          </div>
          <div className="container-fluid px-0">
            <label>Coach</label>
            {renderCoachForm()}
          </div>
          <div className="container-fluid px-0">
            <label>Duracion</label>
            <select
              value={video.duration}
              className="form-control mb-3"
              onChange={(e) => modifier("duration", e.target.value)}
            >
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
          <div className="container-fluid px-0">
            <label>Disponible el</label>
            <input
              type="date"
              className="form-control mb-3"
              value={moment(available_at).utc().format("YYYY-MM-DD")}
              onChange={(e) => modifier("available_at", e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-dark btn-block mt-2"
                disabled={spinner}
              >
                {spinner ? <div className="spinner-border"></div> : "Guardar"}
              </button>
            </div>
            <div className="col-6 text-right">
              <Link
                to="/myadmin/videos"
                className="btn btn-link text-secondary"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      );
    }
    return <div className="spinner-border"></div>;
  };

  const handleFiles = (e) => {
    const currentFile = e.target.files[0];
    modifier("picture", currentFile);
  };

  const renderClassTypes = () => {
    if (class_types && class_types !== null) {
      return class_types.map((class_type) => (
        <option key={class_type.class_type_id} value={class_type.class_type_id}>
          {class_type.name}
        </option>
      ));
    }
  };

  const renderVideoTypes = () => {
    if (Array.isArray(video_types)) {
      return video_types.map((video_type) => (
        <option key={video_type.video_type_id} value={video_type.video_type_id}>
          {video_type.name}
        </option>
      ));
    }
  };

  return <div className="container-fluid">{renderForm()}</div>;
};

export default VideoForm;
