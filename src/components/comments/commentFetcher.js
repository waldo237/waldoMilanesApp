import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

const Header = ({ data }) =>{
    
        console.log(data)
    //   <header>
    //     <h1>{data.site.siteMetadata.title}</h1>
    //   </header>
    return <div />
    
} 
export default function MyHeader(props) {
  return (
    <StaticQuery
      query={graphql`
      query new {
        HWGraphQL {
          projects {
            _id
            comments {
              _id
              comment
              date
              userId
            }
            rating
          }
        }
      }
      `}
      render={data => <Header data={data} {...props} />}
    />
  )
}
