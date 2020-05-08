import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import SermonPreview from '../components/molecules/teasers/sermon'
import ArticlePreview from '../components/molecules/teasers/article'
import Head from '../components/base/head/head'

import styles from '../components/pages/inspiration.module.css'

class SermonsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Head siteTitle={siteTitle} />
          <div className="wrapper">
            <h1>Inspiration</h1>
            <div className={styles.group}>
              <h2>Recent Sermons</h2>
              <ul className={styles.groupList + ' article-list'}>
                {sermons.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <SermonPreview article={node} />
                    </li>
                  )
                })}
              </ul>
              <Link className="button button-center" to="/sermons">All Sermons</Link>
            </div>
            <div className={styles.group}>
              <h2>Recent Blog</h2>
              <ul className={styles.groupList + ' article-list'}>
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
              <Link className="button button-center" to="/blog">All Posts</Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default SermonsIndex

export const pageQuery = graphql`
  query InspirationIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulSermon(limit: 3, sort: { fields: [publishDate], order: DESC }) {
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
    allContentfulBlogPost(limit: 3, sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
