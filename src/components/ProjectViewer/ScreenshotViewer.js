import React from 'react';
import PropsType from 'prop-types'

const ScreenshotViewer = ({screenshot, title})=>{
    return (
      <>
        <a
          target="_blank"
          href={screenshot}
          rel="noopener noreferrer"
        >
          <div className="project-screenshot-container">
            <picture>
              <source
                media="(min-width:650px)"
                srcSet={screenshot}
              />
              <source
                media="(min-width:465px)"
                srcSet={screenshot}
              />
              <img
                className="project-screenshot"
                src={screenshot}
                alt={`${title}-view`}
              />
            </picture>
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