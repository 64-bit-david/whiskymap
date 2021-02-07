import 'mapbox-gl/dist/mapbox-gl.css'; 
import './App.css';
import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import * as distilleries from "./data/dist-locations.json";



const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 56.770720743612365,
    longitude: -4.2724397531559655,
    width: "90vw",
    height: "90vh",
    zoom: 6,
  });


  const [selectedDistillery, setSelectedDistillery] = useState(null);


  useEffect(() => {
    const listener = (e) => {
     if(e.key === 'Escape'){
       setSelectedDistillery(null);
     } 
    }
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, [])


  let selectedDistilleryClass =  selectedDistillery ? 'clicked' : '';

  return (
    <div className="main-container">
      <div className="map-container">
       <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
        onViewportChange={(viewport => { setViewport(viewport) })}
        mapStyle="mapbox://styles/vdiad/ckkq0g4201s4r17peswejsg82"
      >
      {distilleries.features.map(distillery => {
        return(
          <Marker key={distillery.id} latitude={distillery.geometry.coordinates[1]} longitude={distillery.geometry.coordinates[0]} >
          <button
            className={`marker-btn ${selectedDistillery.id === distillery.id ? 'clicked' : ''}`}
            onClick={()=>{
              setSelectedDistillery(distillery);
            }}
            >
            <img src="/barrel1.svg" alt="whisky barrel img" />
          </button>
          </ Marker>
        )
      })}
      {selectedDistillery && ( 
        <div className="popup">
          <Popup
            latitude={selectedDistillery.geometry.coordinates[1]}
            longitude={selectedDistillery.geometry.coordinates[0]}
            onClose={()=>{setSelectedDistillery(null)}}
            >
            <h3>{selectedDistillery.properties.NAME}</h3>
            <p>Founded in: </p>
            <p>Region: </p>
          </ Popup>
          </div>
      )} 
        </ReactMapGl>
      </div>
    </div>
  )
}

export default App

