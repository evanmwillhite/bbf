import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import SermonPreview from '../components/molecules/teasers/sermon'

import Podcast from '../img/podcast.inline.svg';

import styles from '../components/pages/blogs.module.css'

class SermonsIndex extends React.Component {
  render() {
    const sermons = get(this, 'props.data.allContentfulSermon.edges')
    const { currentPage, numSermonPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numSermonPages
    const prevPage = currentPage - 1 === 1 ? "/inspiration/sermons/" : `/inspiration/sermons/${(currentPage - 1).toString()}`
    const nextPage = `/inspiration/sermons/${(currentPage + 1).toString()}`

    return (
      <Layout location={this.props.location}>
        <SEO title="Sermons" url={this.props.location.href} />
        <div style={{ background: '#fff' }}>
          <div className="wrapper wrapper-relative">
            <h1>Sermons</h1>
            <a
              className={styles.sermonsLink}
              href="https://www.youtube.com/channel/UCtTKQNSRCLyrKO6y9PliADQ"
              target="_blank"
              rel="noopener"
            >Sermons on YouTube from Tim Rayborn, Pastor Emeritus</a>
            <p className={styles.sermonsTop}>Below are a sampling of sermons. If you would like a recording of another sermon, contact <a href="mailto:akowillhite@gmail.com">Pastor Amanda</a>.</p>
            <ul className="list-reset list-relative">
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
            raw
          }
        }
      }
    }
  }
`
