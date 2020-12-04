import React from 'react';
import PropsType from 'prop-types'
import Img from "gatsby-image"
import { graphql } from "gatsby"
import {isUndefined, isNull} from 'lodash'

const ScreenshotViewer = ({screenshot, title})=>{
    return (
      <>
        <a
          target="_blank"
          href={screenshot}
          rel="noopener noreferrer"
        >
          <div className="project-screenshot-container">
            {/* <picture>
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
            </picture> */}
            <Img fixed={screenshot} alt={`${title}-view`} />
          </div>
        </a>
      </>
)
}

export const query = graphql`
  query {
    file(relativePath: { eq: "public/images/waldo.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
ScreenshotViewer.propTypes= {
    screenshot: PropsType.string.isRequired,
    title: PropsType.string.isRequired
}
export default ScreenshotViewer;