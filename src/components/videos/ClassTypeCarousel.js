import React from "react";
import VideoCard from "./VideoCard";

const ClassTypeCarousel = ({ class_type, videos }) => {
  const getVideos = () => {
    if (Array.isArray(videos)) {
      return videos
        .filter(
          (video) =>
            parseInt(video.class_type_id) === parseInt(class_type.class_type_id)
        )
        .slice(0, 6);
    }
  };

  const renderVideos = () => {
    const videosRender = getVideos();
    if (Array.isArray(videosRender)) {
      return videosRender.map((video) => (
        <VideoCard key={video.video_id} video={video} />
      ));
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="row mb-3 pb-3 border-bottom align-items-center">
        <div className="col-6">
          <h3 className="mb-0">{class_type.name}</h3>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-link text-secondary py-0">
            Ver Todo {class_type.name}
          </button>
        </div>
      </div>
      <div className="row">{renderVideos()}</div>
    </div>
  );
};

export default ClassTypeCarousel;
