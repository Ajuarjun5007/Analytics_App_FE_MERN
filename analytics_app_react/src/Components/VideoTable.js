import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VideoTable.css"; 

const VideoTable = () => {
  const [analyticsVideoData, setAnalyticsVideoData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/video-analytics");
      setAnalyticsVideoData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGoToAnalytics = (videoId) => {
    console.log("videoId",videoId);
    navigate(`/video-analytics-dashboard/${videoId}`);
  };

  return (
    <div className="video-table-container container my-5">
      <h2 className="text-center mb-4">Video Table</h2>
      <div className="table-responsive">
        <table className="video-table table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Camera ID</th>
              <th scope="col">Video ID</th>
              <th scope="col">Go to Analytics</th>
            </tr>
          </thead>
          <tbody>
            {analyticsVideoData.map((video, index) => (
              <tr key={video._id}>
                <td>{index + 1}</td>
                <td>{video?.camera_id}</td>
                <td>{video._id}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleGoToAnalytics(video._id)}>
                    Go to Analytics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoTable;
