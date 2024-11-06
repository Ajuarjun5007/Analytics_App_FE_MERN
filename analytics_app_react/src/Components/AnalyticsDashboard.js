import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AnalyticsDashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AnalyticsDashboard = () => {
  const { videoId } = useParams();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const playerColors = ["#FF6F61", "#6B5B93", "#88B04B", "#F7CAC9"];

  

  const fetchData = async () => {
    console.log("refresh");
    
    try {
      const response = await axios.get(
        `http://localhost:5000/api/video-analytics/${videoId}`
      );
      setAnalyticsData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 2500);
    return () => clearInterval(intervalId);
  }, [videoId]);

  if (loading) {
    return (
      <div className="text-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return <div className="text-center">No data found</div>;
  }

  const MAX_DISTANCE = 6000; 

  return (
    <div className="analytics-dashboard">
      {/* Back Button */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary" onClick={handleBackClick}>
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
      </div>

      {/* Running Distance Section */}
      <div className="running-distance-container">
        <div className="section-title-container">
          <h2 className="section-title">Running Distance</h2>
        </div>
        <div className="running-distance-bars">
          {Object.entries(analyticsData?.distance).map(([key, value], index) => (
            <div className="distance-container" key={key}>
              <div className="running-distance-bar">
                <span
                  className="player-name"
                  style={{ color: playerColors[index % playerColors.length] }}
                >{`Player ${key}`}</span>
                <div
                  className="bar"
                  style={{
                    width: `${(parseFloat(value) / MAX_DISTANCE) * 100}%`,
                    backgroundColor: "#00BFFF",
                  }}
                  title={value}
                />
                <span className="distance-value">{`${value}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time in Dead Zone Section */}
      <div className="time-dead-zone">
        <div className="time-dead-zone-container text-center py-4 mx-auto">
          <div className="section-title-container">
            <h2 className="section-title mb-4">Time in Dead Zone</h2>
          </div>
          <div className="d-flex flex-column align-items-center">
            {Object.entries(analyticsData.deadzone).map(
              ([key, value], index) => (
                <div
                  key={key}
                  className="player-deadzone d-flex justify-content-between py-2 px-3 w-100 w-md-75 w-lg-50"
                >
                  <span
                    className="player-name me-2"
                    style={{
                      color: playerColors[index % playerColors.length],
                      fontWeight: "bold",
                    }}
                  >{`Player ${key}`}</span>
                  <div className="deadzone-time">{value}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Zone Map Section */}
      <div className="zone-map">
        <div className="section-title-container">
          <h2 className="section-title">Zone Map</h2>
        </div>
        <div className="zone-map-container">
          {Object.entries(analyticsData.heatmap).map(
            ([key, base64Data], index) => (
              <div key={key} className="zone-map-image">
                <h4
                  style={{ color: playerColors[index % playerColors.length] }}
                >{`Player ${key}`}</h4>
                <img
                  src={`data:image/png;base64,${base64Data}`}
                  alt={`Zone map for Player ${key}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Heat Map Section */}
      <div className="heat-map">
        <div className="section-title-container">
          <h2 className="section-title">Heat Map</h2>
        </div>
        <div className="heat-map-container">
          {Object.entries(analyticsData.heatmap2).map(
            ([key, base64Data], index) => (
              <div key={key} className="heatmap-image">
                <h4
                  style={{ color: playerColors[index % playerColors.length] }}
                >{`Player ${key}`}</h4>
                <img
                  className="sm-w-30"
                  src={`data:image/png;base64,${base64Data}`}
                  alt={`Heatmap for Player ${key}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
