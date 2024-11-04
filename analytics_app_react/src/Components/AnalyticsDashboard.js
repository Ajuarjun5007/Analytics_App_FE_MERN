import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  const { videoId } = useParams()
  const [analyitcsData, setAnalyticsData] = useState(null);
  const playerColors = ["#FF6F61", "#6B5B93", "#88B04B", "#F7CAC9"];
 
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/video-analytics"
  //     ); 
  //     setAnalyticsData(response.data.data[0]); 
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/video-analytics/${videoId}`);
      setAnalyticsData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!analyitcsData) {
    return <div>Loading...</div>; 
  }

  console.log("res",analyitcsData);
  
  return (
    <>
      <div className="analytics-dashboard">

        {/* Running Distance Section */}
        <div className="running-distance-container">
        <div className="section-title-container">
        <h2 className="section-title">Running Distance</h2>
        </div>
        <div className="running-distance-bars">
          {Object.entries(analyitcsData?.distance).map(([key, value], index) => (
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
        </div>
        {/* Time in Dead Zone Section */}
        {/* <div className="time-dead-zone">
          <div className="time-dead-zone-container">
          <h2 className="section-title">Time in Dead Zone</h2>
          {Object.entries(analyitcsData.deadzone).map(([key, value], index) => (
            <div key={key} className="player-deadzone">
              <span
                className="player-name"
                style={{ color: playerColors[index % playerColors.length] }}
              >{`Player ${key}`}</span>
              <div className="deadzone-time">{value}</div>
            </div>
          ))}
          </div>
        </div> */}
        <div className="time-dead-zone">
  <div className="time-dead-zone-container text-center py-4 mx-auto">
  <div className="section-title-container">
    <h2 className="section-title mb-4">Time in Dead Zone</h2>
    </div>
    <div className="d-flex flex-column align-items-center">
      {Object.entries(analyitcsData.deadzone).map(([key, value], index) => (
        <div key={key} className="player-deadzone d-flex justify-content-between py-2 px-3 w-100 w-md-75 w-lg-50">
          <span
            className="player-name me-2"
            style={{ color: playerColors[index % playerColors.length], fontWeight: 'bold' }}
          >{`Player ${key}`}</span>
          <div className="deadzone-time">{value}</div>
        </div>
      ))}
    </div>
  </div>
</div>


          {/* zone map section */}

          {/* <div className="heat-map">
          <h2 className="section-title">Zone Map</h2>
          {Object.entries(analyitcsData.heatmap).map(([key, base64Data], index) => (
            <div key={key} className="heatmap-image">
              <h4
                style={{ color: playerColors[index % playerColors.length] }}
              >{`Player ${key}`}</h4>
              <img
                src={`data:image/png;base64,${base64Data}`}
                alt={`Heatmap for Player ${key}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div> */}

            {/* heat map section */}

            {/* <div className="heat-map">
          <h2 className="section-title">Heat Map</h2>
          {Object.entries(analyitcsData.heatmap2).map(([key, base64Data], index) => (
            <div key={key} className="heatmap-image">
              <h4
                style={{ color: playerColors[index % playerColors.length] }}
              >{`Player ${key}`}</h4>
              <img
                src={`data:image/png;base64,${base64Data}`}
                alt={`Heatmap for Player ${key}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div> */}

        {/* Zone Map Section */}
<div className="zone-map">
<div className="section-title-container">
  <h2 className="section-title">Zone Map</h2>
  </div>
  <div className="zone-map-container">
    {Object.entries(analyitcsData.heatmap).map(([key, base64Data], index) => (
      <div key={key} className="zone-map-image">
        <h4 style={{ color: playerColors[index % playerColors.length] }}>{`Player ${key}`}</h4>
        <img
          src={`data:image/png;base64,${base64Data}`}
          alt={`Zone map for Player ${key}`}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    ))}
  </div>
  {/* <div className="player-legend">
          {playerColors.map((color, index) => (
            <div key={index} className="player-item">
              <span
                className="player-color"
                style={{ backgroundColor: color }}
              ></span>
              {`Player ${index + 1}`}
            </div>
          ))}
        </div> */}
</div>

{/* Heat Map Section */}
<div className="heat-map">
    <div className="section-title-container">
  <h2 className="section-title">Heat Map</h2>
    </div>
  <div className="heat-map-container">
    {Object.entries(analyitcsData.heatmap2).map(([key, base64Data], index) => (
      <div key={key} className="heatmap-image">
        <h4 style={{ color: playerColors[index % playerColors.length] }}>{`Player ${key}`}</h4>
        <img
        className="sm-w-30"
          src={`data:image/png;base64,${base64Data}`}
          alt={`Heatmap for Player ${key}`}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    ))}
  </div>
  {/* <div className="player-legend">
          {playerColors.map((color, index) => (
            <div key={index} className="player-item">
              <span
                className="player-color"
                style={{ backgroundColor: color }}
              ></span>
              {`Player ${index + 1}`}
            </div>
          ))}
        </div> */}
</div>

      </div>
    </>
  );
};

export default AnalyticsDashboard;
