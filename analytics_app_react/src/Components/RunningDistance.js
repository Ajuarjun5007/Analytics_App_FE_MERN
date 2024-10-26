// src/components/RunningDistance.js
import React from 'react';
import './RunningDistance.css'; 

const RunningDistance = () => {
  const distances = [
    { player: 'Player 1', distance: 1950, color: '#00BFFF' },
    { player: 'Player 3', distance: 1170, color: '#00BFFF' },
    { player: 'Player 4', distance: 810, color: '#00BFFF' },
    { player: 'Player 2', distance: 340, color: '#00BFFF' },
  ];

  return (
    <div className="running-distance-container">
      <h2 className="running-distance-title">Running Distance</h2>
      <div className="running-distance-bars">
        {distances.map((item, index) => (
          <div key={index} className="running-distance-bar">
            <span className="player-name" style={{ color: item.color }}>{item.player}</span>
            <div className="bar" style={{ width: `${(item.distance / 2000) * 100}%`, backgroundColor: item.color }}>
              {item.distance} m
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningDistance;
