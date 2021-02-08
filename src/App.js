import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl";
import * as distilleries from "./data/dist-locations.json";
import Nav from './components/Nav';
import About from './components/About';




const navControlStyle = {
  left: 10,
  top: 10
};






const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 56.770720743612365,
    longitude: -4.2724397531559655,
    width: "100vw",
    height: "100vh",
    zoom: 6,
  });


  const [selectedDistillery, setSelectedDistillery] = useState(null);



  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedDistillery(null);
      }
    }
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, [])




  return (
    <div className="main-container">
      <Nav />
      <About />
      <div className="map-container">
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
          onViewportChange={(viewport => { setViewport(viewport) })}
          mapStyle="mapbox://styles/vdiad/ckkq0g4201s4r17peswejsg82"

        // pitch="2"
        >
          {distilleries.features.map(distillery => {
            return (
              <Marker key={distillery.id} latitude={distillery.geometry.coordinates[1]} longitude={distillery.geometry.coordinates[0]} >
                <button
                  className={`marker-btn`}
                  onClick={() => {
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
                onClose={() => { setSelectedDistillery(null) }}
              >
                <h3>{selectedDistillery.properties.NAME}</h3>
                <p>Founded in: {selectedDistillery.properties.YEAR}</p>
                <p>Region: {selectedDistillery.properties.REGION}</p>
              </ Popup>
            </div>
          )}

          <NavigationControl style={navControlStyle} />
        </ReactMapGl>
      </div>
    </div>
  )
}

export default App

