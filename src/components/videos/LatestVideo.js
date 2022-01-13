import React from "react";
import { S3_ENDPOINT } from "../../utils";
import { Link, navigate } from "@reach/router";

const LatestVideo = ({ video }) => {
  return (
    <div
      className="card no-scale px-0 py-0 latest-card shadow-sm"
      onClick={() => navigate(`/mycitius/video/${video.video_id}`)}
    >
      <div className="row h-100">
        <div className="col col-md-6">
          <img
            src={
              video.thumbnail !== null
                ? `${S3_ENDPOINT}/${video.file.name}.${video.file.type}`
                : `${S3_ENDPOINT}/thebodymethod-logo.jpeg`
            }
            className="latest-card-thumbnail"
            alt="Video thumbnail"
          />
        </div>
        <div className="col col-md-6 px-0">
          <div className="p-4 py-5">
            <h2 className="border-bottom pb-2 mb-3">{video.name}</h2>
            <p>{video.description}</p>
            <Link
              className="btn btn-primary"
              to={`/mycitius/video/${video.video_id}`}
            >
              Comenzar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestVideo;
