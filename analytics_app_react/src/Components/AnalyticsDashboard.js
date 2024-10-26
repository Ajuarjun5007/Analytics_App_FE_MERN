import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const playerColors = ["#FF6F61", "#6B5B93", "#88B04B", "#F7CAC9"];
  // Function to fetch data from your API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/video-analytics"
      ); // Your API endpoint
      setData(response.data.data[0]); // Assuming you want the first item
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <div className="analytics-dashboard">
        {/* Running Distance Section */}
        <h2 className="section-title">Running Distance</h2>
        <div className="running-distance-bars">
          {Object.entries(data.distance).map(([key, value], index) => (
            <div className="distance-container">
            <div key={key} className="running-distance-bar">
              <span
                className="player-name"
                style={{ color: playerColors[index % playerColors.length] }}
              >{`Player ${key}`}</span>
              <div
                className="bar"
                style={{
                  width: `${(parseFloat(value) / 2000) * 100}%`,
                  backgroundColor: "#00BFFF",
                }}
                title={value}
              />
              <span className="distance-value">{value}</span>
            </div>
            </div>
          ))}
        </div>

        {/* Time in Dead Zone Section */}
        <div className="time-dead-zone">
          <h2 className="section-title">Time in Dead Zone</h2>
          {Object.entries(data.deadzone).map(([key, value], index) => (
            <div key={key} className="player-deadzone">
              <span
                className="player-name"
                style={{ color: playerColors[index % playerColors.length] }}
              >{`Player ${key}`}</span>
              <div className="deadzone-time">{value}</div>
            </div>
          ))}
        </div>

          {/* heat map section */}

          <div className="heat-map"></div>

        {/* Zone Map Section */}
        <div className="zone-map">
          <h2 className="section-title">Zone Map</h2>
          <div className="zone-container">
            {data.zonemap_values.map((zone, index) => (
              <div key={index} className="zone-player">
                <h4
                  style={{ color: playerColors[index % playerColors.length] }}
                >{`Player ${zone.id}`}</h4>
                <div className="zone-values">
                  <div
                    className="zone"
                    style={{
                      width: `${zone.green_zone}%`,
                      backgroundColor: "green",
                    }}
                  >
                    {zone.green_zone}%
                  </div>
                  <div
                    className="zone"
                    style={{
                      width: `${zone.yellow_zone}%`,
                      backgroundColor: "yellow",
                    }}
                  >
                    {zone.yellow_zone}%
                  </div>
                  <div
                    className="zone"
                    style={{
                      width: `${zone.red_zone}%`,
                      backgroundColor: "red",
                    }}
                  >
                    {zone.red_zone}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
