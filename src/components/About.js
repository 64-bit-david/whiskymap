import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const About = () => {

  const [navState, setNavState] = useState(false);


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

  const aboutLink = () => {
    return (
      <div className={`about-item-container  about-btn-link  ${navState && 'clicked'}`}>
        <a className="about-link">About</a>
      </div>
    )
  }

  const searchInput = () => {
    return (
      <div className="input">
        <input placeholder="Search for a distillery..." />
      </div>
    )
  }
  return (
    <div className="drop-menu">
      {dropBtn()}
      {searchInput()}
      {aboutLink()}
    </div>

  )
}

export default About
