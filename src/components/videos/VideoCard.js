import { Link } from "@reach/router";
import React from "react";
import { S3_ENDPOINT } from "../../utils";

const VideoCard = ({ video, agregarFavorito, eliminarFavorito, editable }) => {
  const renderTitle = () => {
    if (String(video.name).length > 40) {
      return String(video.name).substring(0, 40) + "...";
    }
    return video.name;
  };

  const renderDescription = () => {
    if (String(video.description).length > 60) {
      return video.description.substring(0, 60) + "...";
    }
    return video.description;
  };

  const renderInstructorName = () => {
    if (video.instructor && video.instructor !== null) {
      return (
        <p className="bold">
          {video.instructor.name} {video.instructor.last_name}
        </p>
      );
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-3 position-relative">
      <Link
        to={`./${video.video_id}`}
        className="text-dark no-decoration"
        style={{ zIndex: 0 }}
      >
        <div className="card shadow-sm no-scale px-0 py-0 card-video">
          <img
            className="video-thumbnail"
            src={
              video.thumbnail !== null
                ? `${S3_ENDPOINT}/${video.file.name}.${video.file.type}`
                : `${S3_ENDPOINT}/thebodymethod-logo.jpeg`
            }
            alt="video thumbnail"
          />
          <div className="container-fluid p-3">
            <h3 className="card-video-title mb-0">{renderTitle()}</h3>
            {!editable && <p className="mb-1">{renderDescription()}</p>}
            {renderInstructorName()}
          </div>
        </div>
      </Link>
      <div
        className="row mx-0"
        style={{
          position: "absolute",
          bottom: 50,
          zIndex: 1,
          right: "6px",
        }}
      >
        <div className="container-fluid">
          {editable ? (
            <Link
              className="btn btn-outline-secondary me-2"
              to={`./${video.video_id}`}
            >
              <i className="fa fa-edit"></i> Editar
            </Link>
          ) : (
            <button
              className={`btn btn-link ${
                video.favorites.length > 0 || video.favorite === 1
                  ? "text-danger"
                  : "text-dark"
              }`}
              onClick={() => {
                if (video.favorites.length > 0 || video.favorite === 1) {
                  eliminarFavorito(video.video_id);
                } else {
                  agregarFavorito(video.video_id);
                }
              }}
            >
              <i className="fa fa-heart"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
