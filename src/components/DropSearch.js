import React, { useState, useEffect, useRef } from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import * as d3 from 'd3-ease';



const DropSearch = ({
  distilleryList,
  setSelectedDistillery,
  viewport,
  setViewport,
  navState,
  setNavState
}) => {

  const [distilleriesToShow, setDistilleriesToShow] = useState([]);
  const [focusedDistillery, setFocusedDistillery] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [keyScroll, setKeyScroll] = useState(false);


  const distilleryListSearch = useRef();



  //zooms into the clicked distilleries location

  const goToDistillery = (long, lat) => {
    setViewport({
      ...viewport,
      longitude: long,
      latitude: lat,
      zoom: 11,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
    })
  }



  //as user types in searchbar, sets an array of matching distillery names


  useEffect(() => {
    if (userInput.length > 0) {
      const results = distilleryList.filter(distillery => {
        return distillery.properties.NAME.toLowerCase().includes(userInput.toLowerCase())
      });
      setDistilleriesToShow(results);
    }
    if (userInput.length === 0) {
      setDistilleriesToShow([]);
      setFocusedDistillery(-1);
    }
  }, [userInput, distilleryList, setFocusedDistillery]);


  //Sets the index for looping through search results as user hits up/down key
  //some conditions needed to prevent error thrown

  useEffect(() => {
    const searchListener = (e) => {
      if (distilleriesToShow.length > 0) {
        if (e.key === 'ArrowDown') {
          setKeyScroll(true);
          if (focusedDistillery < distilleriesToShow.length - 1 && focusedDistillery < 5 && focused > 0) {
            setFocusedDistillery(focusedDistillery + 1);
          }
        }
        else if (e.key === 'ArrowUp') {
          setKeyScroll(true);
          if (focusedDistillery >= 1) {
            setFocusedDistillery(focusedDistillery - 1);
          }
        }
      }
    }
    window.addEventListener('keydown', searchListener);
    return () => {
      window.removeEventListener('keydown', searchListener);
      setKeyScroll(false)
    }
  }, [distilleriesToShow.length, focusedDistillery, focused]);
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setUserInput('');
      }
    }
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, [])



  //Takes the focused index generated above and applies it to correct list item

  useEffect(() => {
    if (distilleriesToShow.length > 0 && keyScroll) {
      if (focusedDistillery >= 0) {
        distilleryListSearch.current.children[focusedDistillery].children[0].focus()
      }
      if (focusedDistillery < 0) {
        distilleryListSearch.current.children[0].children[0].blur();

      }
    }
  }, [distilleriesToShow, focusedDistillery, keyScroll])




  // renders the searchList array into clickable buttons 
  const renderSearchList = () => {
    if (userInput.length > 0) {

      return (
        <ul className={`${focused && 'clicked'}`} ref={distilleryListSearch}>
          {distilleriesToShow.slice(0, 6).map((distillery, index) => {
            return (
              <li key={distillery.id}>
                <button
                  className={`search-btn`}
                  onClick={() => {
                    setSelectedDistillery(distillery)
                    setUserInput('');
                    goToDistillery(
                      distillery.geometry.coordinates[0],
                      distillery.geometry.coordinates[1],
                    )
                    setNavState(false);

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
          value={userInput}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocusedDistillery(0);
          }} />
        {renderSearchList()}
      </div>
    )
  }

  return (
    <div className="drop-menu">
      {searchInput()}
    </div>

  )
}

export default DropSearch;
