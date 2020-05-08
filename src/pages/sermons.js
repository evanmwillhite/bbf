import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import SermonPreview from '../components/molecules/teasers/sermon'

class SermonsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h1>Sermons</h1>
            <ul className="list-reset">
              {sermons.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <SermonPreview sermon={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default SermonsIndex

export const pageQuery = graphql`
  query SermonIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulSermon(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          description {
            childMarkdownRemark {
              html
            }
          }
          scripture
          scriptureLink
          embed {
            content {
              content {
                value
              }
            }
          }
        }
      }
    }
  }
`
