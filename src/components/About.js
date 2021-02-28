import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const About = ({ distilleryList, distilleryListNames }) => {

  const [navState, setNavState] = useState(false);

  const [distilleriesToShow, setDistilleriesToShow] = useState([]);

  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (userInput.length > 0) {
      const results = distilleryList.filter(distillery => {
        return distillery.properties.NAME.toLowerCase().includes(userInput.toLowerCase())
      });


      setDistilleriesToShow(results);
    }
  }, [userInput])


  const onChange = (e) => {
    setUserInput(e.target.value);
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

  const aboutLink = () => {
    return (
      <div className={`about-item-container  about-btn-link  ${navState && 'clicked'}`}>
        <a className="about-link">About</a>
      </div>
    )
  }

  const searchList = () => {
    if (userInput.length > 0) {
      return (
        distilleriesToShow.slice(0, 6).map(distillery => {
          return (
            <li key={distillery.id}><button className="search-btn">{distillery.properties.NAME}</button></li>
          )
        })
      )
    }

  }

  const searchInput = () => {
    return (
      <div className={`input ${navState && 'clicked'}`}>

        <input
          aria-label="Search for a distillery"
          placeholder="Search for a distillery..."
          onChange={(e) => onChange(e)}
          value={userInput} />
        <ul>
          {searchList()}
        </ul>

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
