import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import styles from '../components/pages/blog.module.css'
import Layout from '../components/layout'
import SermonPreview from '../components/molecules/teasers/sermon'

class SermonsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Sermons</div>
          <div className="wrapper">
            <ul className="article-list">
              {sermons.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <SermonPreview article={node} />
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
