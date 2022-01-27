import { Link } from "@reach/router";
import React, { useState, useContext } from "react";
import FilterSection from "../../components/videos/FilterSection";
import VideoCard from "../../components/videos/VideoCard";
import { VideosContext } from "../../context/VideosContext";

const AdminVideos = () => {
  const [page, setPage] = useState(1);

  const { videos } = useContext(VideosContext);

  const renderVideos = () => {
    if (videos && videos !== null) {
      let videosRender = videos;
      return videosRender.map((video) => (
        <VideoCard key={video.video_id} video={video} disableHover editable />
      ));
    }
    return <div className="spinner-border mx-3"></div>;
  };

  const renderPages = () => {
    return (
      <div>
        <div
          className="btn btn-light shadow-sm mx-2 border"
          disabled={page === 1}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          {"<"}
        </div>
        <span className="mx-2">{page}</span>
        <div
          className="btn btn-light shadow-sm mx-2 border"
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row border-bottom mb-3">
        <div className="col col-md-6">
          <h1>Admin Videos</h1>
        </div>
        <div className="col col-md-6 text-end">
          <Link to="./nuevo" className="btn btn-accent">
            + Agregar
          </Link>
        </div>
      </div>
      <FilterSection page={page} />
      <div className="row">{renderVideos()}</div>
      <div className="container-fluid text-right px-0">{renderPages()}</div>
    </div>
  );
};

export default AdminVideos;
