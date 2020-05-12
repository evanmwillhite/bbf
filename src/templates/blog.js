import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import ArticlePreview from '../components/molecules/teasers/article'

class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "inspiration/blog/" : `inspiration/blog/${(currentPage - 1).toString()}`
    const nextPage = `inspiration/blog/${(currentPage + 1).toString()}`

    return (
      <Layout location={this.props.location}>
        <SEO title="Blog" />
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h1>Blog</h1>
            <ul className="list-reset">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          author {
            name
            slug
          }
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
