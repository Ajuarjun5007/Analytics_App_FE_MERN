import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VideoTable.css"; 

const VideoTable = () => {
  const [analyticsVideoData, setAnalyticsVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    console.log("refresh");
    try {
      const response = await axios.get("http://localhost:5000/api/video-analytics");
      setAnalyticsVideoData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch of data
    fetchData();

    // Set an interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleGoToAnalytics = (videoId) => {
    console.log("videoId", videoId);
    navigate(`/video-analytics-dashboard/${videoId}`);
  };

  return (
    <div className="video-table-container container my-5">
      <h2 className="text-center mb-4">Video Table</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : analyticsVideoData.length === 0 ? (
        <div className="text-center">
          <p>No data found</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="video-table table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Camera ID</th>
                <th scope="col">Booking ID</th>
                <th scope="col">Go to Analytics</th>
              </tr>
            </thead>
            <tbody>
              {analyticsVideoData.map((video, index) => (
                <tr key={video._id}>
                  <td>{index + 1}</td>
                  <td>{video?.camera_id}</td>
                  <td>{video?.booking_id}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleGoToAnalytics(video.booking_id)}>
                      Go to Analytics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VideoTable;
