import React, { useEffect } from 'react'

const About = ({ aboutState, setAboutState }) => {

  useEffect(() => {

    const listener = (e) => {
      if (e.key === 'Escape') {
        setAboutState(false);
      }
    }
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, [setAboutState])

  return (
    <div className={`about-page-main ${aboutState && 'clicked'}`}>
      <div className="about-container">
        <h2>About</h2>
        <p>Use this interactive map to explore the whisky distilleries dotted throughout Scotland. </p>
        <button className="about-btn about-btn-back" onClick={() => setAboutState(!aboutState)}>
          --Back to Map--
        </button>
        <a href="https://david-w.dev">Website Created by David Williamson</a>

        <a href="https://blog.mapbox.com/designing-the-vintage-style-in-mapbox-studio-9da4aa2a627f"
          className="about-design-credit">Map design inspired by Amy Lee Walton</a>
      </div>
    </div>
  )
}

export default About;
