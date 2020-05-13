import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import SermonPreview from '../components/molecules/teasers/sermon'

import styles from '../components/pages/blogs.module.css'

class SermonsIndex extends React.Component {
  render() {
    const sermons = get(this, 'props.data.allContentfulSermon.edges')
    const { currentPage, numSermonPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numSermonPages
    const prevPage = currentPage - 1 === 1 ? "inspiration/sermons/" : `inspiration/sermons/${(currentPage - 1).toString()}`
    const nextPage = `inspiration/sermons/${(currentPage + 1).toString()}`

    return (
      <Layout location={this.props.location}>
        <SEO title="Sermons" url={this.props.location.href} />
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
            <div className={styles.prevNext}>
              {!isFirst && (
                <Link to={prevPage} rel="prev">
                  ← Previous Page
                </Link>
              )}
              {!isLast && (
                <Link to={nextPage} rel="next" className={styles.nextBlog}>
                  Next Page →
                </Link>
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default SermonsIndex

export const pageQuery = graphql`
  query SermonIndexQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulSermon(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
