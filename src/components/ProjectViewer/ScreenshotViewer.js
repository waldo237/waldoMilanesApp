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
            <div className='project-device-showing-screenshot' />
            {/* <svg className='project-device-showing-screenshot' xmlns="http://www.w3.org/2000/svg" id="Capa_1" enableBackground="new 0 0 497 497" viewBox="0 0 497 497"><g><path d="m275.57 401-84.14 30-3.19 11.15c-4.53 15.87-21.74 28.85-38.24 28.85v7.5h174.5z" fill="#adaca7" /><path d="m308.76 442.15-11.76-41.15-48.5-30-48.5 30-8.57 30h84.14l3.19 11.15c4.53 15.87 21.74 28.85 38.24 28.85l15 7.5 15-7.5c-16.5 0-33.71-12.98-38.24-28.85z" fill="#8f8f8b" /><path d="m437 401h30c16.5 0 30-13.5 30-30v-60l-60-60z" fill="#adaca7" /><path d="m0 371c0 16.5 13.5 30 30 30h407c16.5 0 30-13.5 30-30v-180l-467 120z" fill="#cbc9c2" /><path d="m467 11h-30l30 300h30v-270c0-16.5-13.5-30-30-30z" fill="#404242" /><path d="m467 41c0-16.5-13.5-30-30-30h-407c-16.5 0-30 13.5-30 30v270h467v-30l-218.5-120.013z" fill="#565959" /><path d="m467 40.995-29.994-.021c0 .005-188.506 120.013-188.506 120.013s188.502 120.011 188.5 120.013c0 0 29.999-.02 29.999-.02.001 0-.002-239.981.001-239.985z" fill="#4b88d5" /><path d="m437 40.995-406.912-.022c-.025.012-.046 240.022-.088 240.027 0 0 406.98-.02 406.99-.02.005 0-.032-239.981.01-239.985z" fill="#69a7ff" /><circle cx="248.5" cy="356" fill="#fff" r="15" /><path d="m403.5 486h-310c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h310c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5z" fill="#8f8f8b" /></g></svg> */}
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