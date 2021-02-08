import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const About = () => {

  const [aboutState, setAboutState] = useState(false);


  const aboutDropBtn = () => {
    return (

      <div className={`about-item-container about-btn-container ${aboutState && 'clicked'}`}>
        <button
          className={` about-btn ${aboutState && 'clicked'}`}
          onClick={() => { setAboutState(!aboutState) }}
        >
          <FontAwesomeIcon icon={faChevronCircleDown} size='lg' />
        </button></div>
    )
  }

  const aboutMenu = () => {
    return (
      <div className={`about-item-container  about-btn-link  ${aboutState && 'clicked'}`}>
        <a className="about-link">About</a>
      </div>
    )
  }

  return (
    <div className="about">
      {aboutDropBtn()}
      {aboutMenu()}
    </div>

  )
}

export default About
