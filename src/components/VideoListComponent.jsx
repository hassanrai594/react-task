import React, { useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";

const VideoList = () => {
  const sdk = new MkdSDK();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = async (page) => {
    try {
      const response = await sdk.callRestAPI(
        { payload: {}, page: page, limit: 10 },
        "PAGINATE"
      );
      setVideos(response.list);
      setTotalPages(response.num_pages);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    sdk.setTable("video"); // Set the table name to "video"
    fetchVideos(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id} className="video-item">
          <img src={video.photo} alt={video.title} />
          <h3>{video.title}</h3>
          <p>{video.username}</p>
        </div>
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoList;
