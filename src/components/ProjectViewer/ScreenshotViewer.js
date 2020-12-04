import React from 'react';
import PropsType from 'prop-types'
import Img from "gatsby-image"

const ScreenshotViewer = ({screenshot, title})=>{
    return (
      <>
        <a
          target="_blank"
          href={screenshot}
          rel="noopener noreferrer"
        >
          <div className="project-screenshot-container">
            <Img className="project-screenshot" fluid={screenshot} alt={`${title}-view`} />
          </div>
        </a>
      </>
)
}

ScreenshotViewer.propTypes= {
    screenshot: PropsType.string.isRequired,
    title: PropsType.string.isRequired
}
export default ScreenshotViewer;