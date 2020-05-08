import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import SermonPreview from '../components/molecules/teasers/sermon'
import ArticlePreview from '../components/molecules/teasers/article'
import TeaserList from '../components/organisms/teaserList/teaserList'

class SermonsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h1>Inspiration</h1>
            <TeaserList
              title="Recent Sermons"
              link="/sermons"
              linkText="All Sermons"
            >
              {sermons.map(({ node }) => {
                return (
                  <SermonPreview sermon={node} />
                )
              })}
            </TeaserList>
            <TeaserList
              title="Recent Blog"
              link="/blog"
              linkText="All Posts"
            >
              {posts.map(({ node }) => {
                return (
                  <ArticlePreview article={node} />
                )
              })}
            </TeaserList>
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
