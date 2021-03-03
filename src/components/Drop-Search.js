import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FlyToInterpolator } from 'react-map-gl';
import * as d3 from 'd3-ease';

const About = ({
  distilleryList,
  setSelectedDistillery,
  viewport,
  setViewport
}) => {

  const [navState, setNavState] = useState(false);

  const [distilleriesToShow, setDistilleriesToShow] = useState([]);

  const [userInput, setUserInput] = useState('');


  //zooms into the clicked distilleries location
  const goToDistillery = (long, lat) => {
    setViewport({
      ...viewport,
      longitude: long,
      latitude: lat,
      zoom: 12,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
    })
  }


  //as user types in searchbar, creates an array of distilleries where name matches user input
  useEffect(() => {
    if (userInput.length > 0) {
      const results = distilleryList.filter(distillery => {
        return distillery.properties.NAME.toLowerCase().includes(userInput.toLowerCase())
      });
      setDistilleriesToShow(results);
    }
  }, [userInput])


  const onChange = (e) => {

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


  //add an onclick here that somehow selected the distillery, sets selectedDistillery as well

  const searchList = () => {
    if (userInput.length > 0) {
      return (
        <ul className={`${navState && 'clicked'}`}>
          {distilleriesToShow.slice(0, 6).map(distillery => {
            return (
              <li key={distillery.id}>
                <button
                  className="search-btn"
                  onClick={() => {
                    setSelectedDistillery(distillery)
                    setUserInput('');
                    goToDistillery(
                      distillery.geometry.coordinates[0],
                      distillery.geometry.coordinates[1],
                    )
                  }}
                >
                  {distillery.properties.NAME}
                </button>
              </li>
            )
          })}
        </ul>
      )
    }

  }

  const searchInput = () => {
    return (
      <div className={`input ${navState && 'clicked'}`}>

        <input
          aria-label="Search for a distillery"
          placeholder="Search for a distillery..."
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput} />
        {searchList()}

      </div>
    )
  }

  return (
    <div className="drop-menu">
      {dropBtn()}
      {searchInput()}

    </div>

  )
}

export default About
