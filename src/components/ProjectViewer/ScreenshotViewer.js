import React from 'react';
import PropsType from 'prop-types'
import Img from "gatsby-image"

const ScreenshotViewer = ({screenshotImage, screenshot, title})=>{
    return (
      <>
        <a
          target="_blank"
          href={screenshot}
          rel="noopener noreferrer"
        >
          <div className="project-screenshot-container">
            <Img className="project-screenshot" fluid={screenshotImage} alt={`${title}-view`} />
          </div>
        </a>
      </>
)
}

ScreenshotViewer.propTypes= {
    // eslint-disable-next-line react/forbid-prop-types
    screenshotImage: PropsType.object.isRequired,
    screenshot: PropsType.string.isRequired,
    title: PropsType.string.isRequired,
}
export default ScreenshotViewer;