import React from 'react'

const about = ({ aboutState, setAboutState }) => {
  return (
    <div className={`about-page-main ${aboutState && 'clicked'}`}>
      <div className="about-container">
        <h2>About</h2>
        <p>Use this interactive map to explore the vast number of whisky distilleries dotted throughout Scotland! </p>
        <button className="about-btn" onClick={() => setAboutState(!aboutState)}>
          --Back to Map--
        </button>
        <a href="#">Created by David Williamson</a>
      </div>
    </div>
  )
}

export default about
