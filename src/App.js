import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import mapboxgl from 'mapbox-gl';
import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker, Popup, NavigationControl } from "react-map-gl";
import * as distilleries from "./data/dist-locations.json";
import Header from './components/Header';
import DropSearch from './components/Drop-Search';
import About from './components/About';


const navControlStyle = {
  left: 20,
  top: 20,
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

  const [distilleryList, setDistilleryList] = useState([]);

  const [aboutState, setAboutState] = useState(false);

  const [navState, setNavState] = useState(false);



  useEffect(() => {
    setDistilleryList([...distilleries.features])
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



  const AboutLink = () => {
    return (
      <div className={`about-btn-container ${navState && 'clicked'}`}>
        <button
          className="about-btn"
          onClick={() => setAboutState(!aboutState)}>About</button>
      </div>
    )
  }

  const dropBtn = () => {
    return (
      <div className={`drop-item-container drop-btn-container ${navState && 'clicked'}`}>
        <button
          className={` drop-btn ${navState && 'clicked'}`}
          onClick={() => { setNavState(!navState) }}
        >
          <FontAwesomeIcon icon={faChevronCircleDown} size='lg' />
        </button></div>
    )
  }




  return (
    <div className="main-container">
      <div className="nav">
        <Header />
        {dropBtn()}
        {AboutLink()}

        <DropSearch
          distilleryList={distilleryList}
          setSelectedDistillery={setSelectedDistillery}
          viewport={viewport}
          setViewport={setViewport}
          navState={navState}
          setNavState={setNavState} />

      </div>


      <div className="map-container">
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
          onViewportChange={(viewport => { setViewport(viewport) })}
          mapStyle="mapbox://styles/vdiad/ckkq0g4201s4r17peswejsg82"
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
                closeOnClick={false}
                className="popup-styling"
              >
                <h3>{selectedDistillery.properties.NAME}</h3>
                <p>Founded in: {selectedDistillery.properties.YEAR}</p>
                <p>Region: {selectedDistillery.properties.REGION}</p>
                <p>Website:
                  <a href={selectedDistillery.properties.WEBSITE}>{selectedDistillery.properties.WEBSITE}</a>
                </p>
                <p>Owned By: {selectedDistillery.properties.OWNER}</p>
              </ Popup>
            </div>
          )}
          <NavigationControl
            style={navControlStyle}
            className={`nav-control ${aboutState ? 'hide' : ''}`}
          />
        </ReactMapGl>
      </div>
      <About aboutState={aboutState} setAboutState={setAboutState} />
    </div>
  )
}

export default App;

